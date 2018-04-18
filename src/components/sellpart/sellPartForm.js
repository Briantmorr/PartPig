import React, {Component} from "react";
import "./sellpart.css";
import "./yearMakeModelSelect.css";
import ImageUpload from '../imageUploader/imageUploader';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Field from '../tools/field';
import ListingSuccess from "../listingSuccess/listingSuccess";
import formInputs from './formData';
import MakeDropDown from '../searchpage/dropdown/makeDropdown';
import ModelDropDown from '../searchpage/dropdown/modelDropdown';
import YearDropDown from '../searchpage/dropdown/yearDropdown';
import data from '../searchpage/dataModel';


class SellPartForm extends Component{
    
    constructor(props){
        super(props);

        this.userId = localStorage.getItem('user');
        this.state = { 
            isLoading: false,
            part:{
                "make": 'default',
                "model": 'default',
                "year": 'default',
                "part_name": '',
                "brand": '',
                "price_usd": 0,
                "part_condition": '1',
                "description": '',
                "category": 1,
                "images": [],
                "part_number": '',
                "seller_id": this.userId
            },            
            partErrors:{}
        }
        this.catchMakeSelect = this.catchMakeSelect.bind(this);
        this.catchModelSelect = this.catchModelSelect.bind(this);
        this.catchYearSelect = this.catchYearSelect.bind(this);
    }
    
    handleSellPartSubmit(event){
        event.preventDefault();
        const url = "http://localhost:8000/teampartpig/src/assets/php/listNewPart/processSellPartForm.php";

        axios({
            url: url,
            method: 'post',
            data: this.state.part, 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(resp=>{
            console.log("Server Response:", resp);
            // this.props.history.push('/listingsuccess');
        }).catch(err => {
            console.log("There was an error:");
            // this.props.history.push('/listingsuccess');
        });
    }

    handleImageChange(files) {
        
        for(let i=0; i < files.length; i++){
            let reader = new FileReader();            
            let file = files[i];
        
            reader.onloadend = () => {
                const { part } = this.state;
                part['images'].push({imagePreviewUrl:reader.result, file:file});
                this.setState({
                    part: {...part}
                });         
            }
        
            reader.readAsDataURL(file);            
        }        
    }

    deleteImageChange(event) {
        
        const element = event.target;
                    
        const { part } = this.state;
        const index = this.containsImage(element,part.images);
        if(index !== -1){
            part['images'].splice(index,1);
            this.setState({
                part: {...part}
            });
        }       
    }

    containsImage(obj, list) {        
        for (let i = 0; i < list.length; i++) {
            if (list[i].imagePreviewUrl === obj.name) {
                return i;
            }
        }    
        return -1;
    }

    formValidation(listingFormData){ 
        event.preventDefault();

        const {email, password, confirmPassword} = this.props.values;
        const errors = [];

        if(!part_name){
            errors.push('Please enter a part name');
        }

        this.props.formError(errors);

        if(errors.length === 0){
            this.props.signUp({email, password});
        }
        
    }
  
    handlePartInputChange(event){
        const {value,name} = event.target;
        const newPart = {...this.state.part};
        newPart[name] = value;
        this.setState({
            part:newPart
        });  
    }

    partHandleOnBlur(event){

        const elements = document.querySelector("require=true");
        const {name,value,placeholder,required} = event.target;
        const newPartErrors = {...this.state.partErrors};
        if(value ==='' && required){           
            newPartErrors[name] = placeholder + ' is requiered';           
        }else{
            delete newPartErrors[name];            
        }
        this.setState({
            partErrors:newPartErrors
        });
    }

    catchMakeSelect(selectedMake){
        const caughtMake = selectedMake;
        const newPart = {...this.state.part};
        newPart['make'] = caughtMake;
        this.setState({
            part: newPart
        });
    }

    catchModelSelect(selectedModel){
        const caughtModel = selectedModel
        const newPart = {...this.state.part};
        newPart['model'] = caughtModel;
        this.setState({
            part: newPart
        });        
    }

    catchYearSelect(selectedYear){        
        const caughtYear = selectedYear
        const newPart = {...this.state.part};
        newPart['year'] = caughtYear;
        this.setState({
            part: newPart
        });  
    }

    validateFields(){
        return(this.state.part.images.length > 0 
            && this.state.part.year !== 'default'
            && this.state.part.part_name !== ''
            && this.state.part.price_usd > 0);        
    }

    render() {
        
        const fields = formInputs.map((field,index) => {
            return <Field key={index} {...field} error={this.state.partErrors[field.name]} handleOnBlur={this.partHandleOnBlur.bind(this)} handleInputChange={this.handlePartInputChange.bind(this)} value={this.state.part[field.name] || ''}/>
        });

        let listPartButton = <button type='button' onClick={this.handleSellPartSubmit.bind(this)} className="button-link">List Part</button>
        if(!this.validateFields()){
            listPartButton = <button onClick={e => e.preventDefault()} className='disabled'>List Part</button>;
        }
        return(
            <div className="sellPartContainer">
                <h1 className="sellPartTitle">List a part for sale!</h1>
                <form className="sellPartForm">
                    <div className="partDetailsSellForm">
                        <h1>Part Details</h1>
                        {fields}
                    </div>
                    <div className='makeModelYearContainer'>    
                        <h1>What model does this part fit? *</h1>
                        <div className="yearMakeModel">
                            <MakeDropDown className="makeDropdown" data={data} makeSelect={this.catchMakeSelect} currentMake={this.state.part.make}/>
                            <ModelDropDown className="modelDropdown" data={data} value={this.state.part.model} modelSelect={this.catchModelSelect} selectedMake={this.state.part.make} selectedModel={this.state.part.model}/>
                            <YearDropDown className="yearDropdown" data={data} value={this.state.part.year} yearSelect={this.catchYearSelect} selectedMake={this.state.part.make} selectedModel={this.state.part.model}/>
                        </div>                                                       
                    </div> 
                    <div>
                    <h1>Upload Images *</h1>
                        <ImageUpload images={this.state.part.images} handleImageChange={this.handleImageChange.bind(this)} deleteImage={this.deleteImageChange.bind(this)}/>
                        </div>   
                    <div className="buttonContainer">
                        {listPartButton}
                    </div>
                </form>
            </div>          
        );
    
    }
}   

export default SellPartForm;