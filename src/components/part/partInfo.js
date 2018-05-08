import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fb from '../../assets/images/facebook.png';
import email from '../../assets/images/email.png';
import axios from 'axios';

class PartInfo extends Component {

    constructor(props){
        super(props);

        this.userId = localStorage.getItem('user');
        this.state = {
            partInfo:props.partInfo,
            editable: false,
            updated: false,
            errorPrice: ''  //if user edit the price wrongly
        }
        this.oldPartInfo = props.partInfo; 
        this.editField = this.editField.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.resetPartInfo = this.resetPartInfo.bind(this);
    }

    /**
     * add the the part to the user cart and move to the results page
     */
    addCart(){
        this.props.addCart(this.state.partInfo,false);
        if(this.props.history){
            this.props.history.push(this.props.urlBack);
        }   
    }
    
    /**
     * check if the obj is in the list
     * @param {*} obj 
     * @param {*} list 
     */
    containsObject(obj, list) {        
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                return true;
            }
        }    
        return false;
    }
    
    /**
     * when a element the user is editing lose the focus we change the information of the part in the state
     * 
     * @param {*} event 
     */
    editField(event){
        event.preventDefault();
        const element = event.target;
        const elementId = element.id;
        const elementText = element.textContent
        //control if the price the user change is still a number
        if(elementId==='price_usd' && isNaN(elementText)){
            this.setState({
                errorPrice:'Please input a valid price'
            });
        }else{
            const newPartInfo = {...this.state.partInfo};
            newPartInfo[elementId] = elementText;
            this.setState({
                partInfo: newPartInfo,
                errorPrice:''
            });
        }
    }

    /**
     * when the user click in the edit's button we make some elements editables
     * 
     * @param {*} element Parent element from we have to change the childs
     * @param {*} editableFlag boolean indicate if the element is editable or not
     */
    handleEditButton(element,editableFlag){
        const numChild = element.childNodes.length
        //go throught all the elment childs 
        for(let i = 0; i < numChild; i++){
            let child = element.childNodes[i];
            if(child.tagName === 'SPAN' && child.id !==''){
                if(editableFlag){
                    child.contentEditable = true;
                    child.onblur=this.editField;
                    child.classList.add("editable");
                }else{
                    child.contentEditable = false;
                    child.onblur='';
                    child.classList.remove("editable");
                }
            }else{
                //if the child is not SPAN element we check the childrens of this element
                this.handleEditButton(child,editableFlag);
            }
        }
    }

    /**
     * if the user cancel we get back the original info of the part
     */
    resetPartInfo(){
        this.setState({
            editable:false,
            partInfo: this.oldPartInfo
        });
        this.handleEditButton(document.getElementsByClassName('productDetailsContainer')[0],false);
    }

    /**
     * we save the new info of the part in the DB
     */
    savePartInfo(){

        //axios call to update the part  
        const url = "/assets/php/editPartDetails.php";

        axios({
            url: url,
            method: 'post',
            data: this.state.partInfo, 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(resp=>{ 
            //stablish the new data as a old data    
            this.oldPartInfo = this.state.partInfo;                  
            this.setState({
                editable:false,
                updated: true
            }); 
            //make all the elements not editables    
            this.handleEditButton(document.getElementsByClassName('productDetailsContainer')[0],false);
            
        }).catch(err => {
            // console.log("There was an error:");
            this.props.history.push('/error');            
        });
        
    }

    /**
     * change the status of the part to available
     */
    confirmPart(){       
        const params = {
            status: 'available',
            id: this.state.partInfo.id
        };
        const urlStatus = '/assets/php/updatePartStatus.php';
        axios.get(urlStatus, { params }).then(resp => {
            if (resp.data.success) {
                this.props.history.push('/dashboard/activeparts');
            }
        }).catch(err => {
            // console.log('error is: ', err);
        });
    }

    /**
     * if the user is listing a new part and cancel we delete that part
     */
    cancelPart(){        
        const params = {
            status: 'deleted',
            id: this.state.partInfo.id
        };
        const urlStatus = '/assets/php/updatePartStatus.php';
        axios.get(urlStatus, { params }).then(resp => {
            if (resp.data.success) {
                this.props.history.push('/sellpart');
            }
        }).catch(err => {
            // console.log('error is: ', err);
        });
    }

    componentDidMount(){
        //if the action came from the dashboard we put the element as editables
        if(this.props.fromDashboard=='true'){
            this.handleEditButton(document.getElementsByClassName('productDetailsContainer')[0],true);
            this.setState({
                editable:true           
            });
        }
    }

    componentDidUpdate(){
        if(this.state.partInfo !== this.props.partInfo && !this.state.editable && !this.state.updated){
            this.setState({
                partInfo:this.props.partInfo
            });
        }
    }

    render(){
        let details = '';     
        let share = '';  
        let multiUsebutton = '';        
        let editableUsebutton = '';
        let cancelButton = '';
        let messageEditable = '';
        let confirmButton = '';
        let deletePartButton = '';

        //depends from wehre the user arrive to this component we show some buttons or others
        if(this.props.isCart){
            multiUsebutton = <button className='button-link' onClick={()=>this.props.removePart(this.state.partInfo)}>Remove</button>;
        }else if(this.props.fromDashboard=='true'|| this.props.newPart=='true'){
            if(this.props.newPart=='true'){
                confirmButton = <button className='button-link editButton' onClick={this.confirmPart.bind(this)}>Confirm</button>;
                deletePartButton = <button className='button-link editButton' onClick={this.cancelPart.bind(this)}>Cancel</button>;
            }
            if(this.state.editable){
                if(this.state.errorPrice === ''){
                    editableUsebutton = <button className='button-link editButton' onClick={this.savePartInfo.bind(this)}>Save</button>;
                }
                else{
                    editableUsebutton = <button className='button-link editButton disabled'>Save</button>;
                }
                cancelButton = <button className='button-link editButton' onClick={this.resetPartInfo}>Cancel</button>;
                messageEditable = <span className='editMessage'>Click in the elements on blue to edit them</span>
                confirmButton='';
                deletePartButton = '';
            }else{
                editableUsebutton = <button className='button-link editButton' onClick={()=>{
                    this.setState({editable: true});
                    this.handleEditButton(document.getElementsByClassName('productDetailsContainer')[0],true);}}>Edit</button>;
                cancelButton ='';
            }
        }else{
            if(this.containsObject(this.state.partInfo,this.props.cartParts)){
                multiUsebutton = <button className='disabled addButton'>Added</button>;            
            }else{
                if(this.userId !== this.state.partInfo.seller_id){
                    multiUsebutton = <button className='button-link addButton' onClick={()=>{this.addCart()}}>Add to Cart</button>;
                }                
            }
        }

        //info only show in the details component
        if(this.props.isDetails){
            details = (
                <div>
                    <hr/>                
                    <p className="productDescription"><span id='description'>{this.state.partInfo.description}</span></p>
                    <p className="productCondition">Condition: {this.state.partInfo.part_condition}</p>
                    <p className="productLocation">Location: {this.state.partInfo.city + ', '+ this.state.partInfo.state}</p>               
                    <p>Seller: {this.state.partInfo.seller} {confirmButton}{editableUsebutton}{cancelButton}{deletePartButton}</p>
                    {messageEditable}
                </div>           
            );
            
            share = (
                <div className='share'>
                    Share this <img src={email} /> <img src={fb} />
                </div>
            );
        }
      

        return (
            <div className={this.props.infoClass}>
                {/* {share} */}
                <span id='brand'>{this.state.partInfo.brand}</span> <span id='part_number' className="partNumber">{this.state.partInfo.part_number} </span><span className="partNumber">P/N:</span>
                <h3 className="productTitle"><span id='part_name'>{this.state.partInfo.part_name}</span></h3>
                <span><b>{this.state.partInfo.category} - {this.state.partInfo.make} {this.state.partInfo.model} {this.state.partInfo.year} </b></span>                
                <p className="productPrice"><span>$</span><span id='price_usd'>{parseFloat(this.state.partInfo.price_usd).toFixed(2)}</span><span className="errorPrice">{this.state.errorPrice}</span> {multiUsebutton}</p>          
                {details}
            </div> 
        );
    }
}


export default PartInfo;
