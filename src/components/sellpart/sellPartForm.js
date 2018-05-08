import React, {Component} from "react";
import ImageUpload from './imageUploader';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Field from '../tools/field';
import ListingSuccess from "./listingSuccess";
import formInputs from './formData';
import MakeDropDown from '../tools/dropdown/makeDropdown';
import ModelDropDown from '../tools/dropdown/modelDropdown';
import YearDropDown from '../tools/dropdown/yearDropdown';
import data from '../searchpage/dataModel';
import Loading from '../tools/loading/loading';
import "./sellPartForm.css";

class SellPartForm extends Component{
    
    constructor(props){
        super(props);

        this.userId = localStorage.getItem('user');
        if(!this.userId){
            props.history.push('/login');
        }
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
                "category_id": 1,
                "images": [],
                "part_number": '',
                "seller_id": this.userId
            },            
            partErrors:{},
            isLoading: false
        }
        this.catchMakeSelect = this.catchMakeSelect.bind(this);
        this.catchModelSelect = this.catchModelSelect.bind(this);
        this.catchYearSelect = this.catchYearSelect.bind(this);
    }
    
    handleSellPartSubmit(event){
        event.preventDefault();
        if(this.validateFields()){
            this.setState({
                isLoading: true
             });
        }
    }

    componentDidUpdate(){
        
        if(this.state.isLoading){
            const url = "/assets/php/listNewPart/processSellPartForm.php";
            
            axios({
                url: url,
                method: 'post',
                data: this.state.part, 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(resp=>{
                this.props.history.push(`/partdetails/${resp.data.data[0]}/newPart/true`);
            }).catch(err => {
                // console.log("There was an error:");
                this.props.history.push('/error');                

            });
        }
    }

    handleImageChange(files) {
        
        const newPartErrors = {...this.state.partErrors};       
        delete newPartErrors['images'];            
        
        for(let i=0; i < files.length; i++){
            let reader = new FileReader();
            let file = files[i];
        
            reader.onloadend = () => {
                const { part } = this.state;
                part['images'].push({imagePreviewUrl:reader.result, file:file});
                this.setState({
                    part: {...part},
                    partErrors:newPartErrors
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
            const newPartErrors = {...this.state.partErrors};
            if(this.state.part.images.length <= 1){
                newPartErrors['images'] = 'You need to add at least one image';           
             }else{
                 delete newPartErrors['images'];            
             }
            part['images'].splice(index,1);
            this.setState({
                part: {...part},
                partErrors:newPartErrors
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

    handlePartInputChange(event){
        const {value,name} = event.target;
        const newPart = {...this.state.part};
        newPart[name] = value;
        this.setState({
            part:newPart
        });
    }

    partHandleOnBlur(event){
        const {name,value,placeholder,required} = event.target;
        const newPartErrors = {...this.state.partErrors};
        if(value ==='' && required){           
            newPartErrors[name] = placeholder + ' is required';           
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
        const newPartErrors = {...this.state.partErrors};
        delete newPartErrors['year']; 
        this.setState({
            part: newPart,
            partErrors:newPartErrors
        });
    }

    validateFields(){
        const newPartErrors = {...this.state.partErrors};
        if(this.state.part.images.length === 0){
           newPartErrors['images'] = 'You need to add at least one image';           
        }else{
            delete newPartErrors['images'];            
        }
        
        if(this.state.part.year === 'default'){
            newPartErrors['year'] = 'You need to choose make, model and year';           
        }else{
            delete newPartErrors['year'];            
        }
        
        if(this.state.part.part_name === ''){
            newPartErrors['part_name'] = 'Part name is required';           
        }else{
            delete newPartErrors['part_name'];            
        }

        if(this.state.part.price_usd === 0){
            newPartErrors['price_usd'] = 'Price is required';           
        }else{
            delete newPartErrors['price_usd'];
        }              
        
        this.setState({
            partErrors:newPartErrors
        });

        return (Object.keys(newPartErrors).length === 0);
    }

    render() {
        
        if (this.state.isLoading) {
            return(<div className='container'>
                        <Loading />
                    </div>
                   );
        }

        const fields = formInputs.map((field,index) => {
            return <Field key={index} {...field} error={this.state.partErrors[field.name]} handleOnBlur={this.partHandleOnBlur.bind(this)} handleInputChange={this.handlePartInputChange.bind(this)} value={this.state.part[field.name] || ''}/>
        });
        
        
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
                        <div className="help-block">{this.state.partErrors['year']}</div>                                                      
                    </div> 
                    <div className='uploadImages'>
                        <h1>Upload Images *</h1>
                        <ImageUpload error={this.state.partErrors['images']} images={this.state.part.images} handleImageChange={this.handleImageChange.bind(this)} deleteImage={this.deleteImageChange.bind(this)}/>
                    </div>   
                    <div className="buttonContainer">
                        <button type='button' onClick={this.handleSellPartSubmit.bind(this)} className="button-link">List Part</button>
                    </div>
                </form>
            </div>
        );
    
    }
}   

export default SellPartForm;
