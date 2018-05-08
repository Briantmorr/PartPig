import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../tools/loading/loading';
import axios from 'axios';
import './updatePartStatus.css';


class UpdatePartStatus extends Component {
        
    constructor(props){
        super(props);
        this.state = {
            status: this.props.status,
            pendingStatus: this.props.status,
            isLoading: false,  
            seller_id: 2,
            pending: false     
        }
    
        this.statusChange = this.statusChange.bind(this);
        this.cancelStatusChange = this.cancelStatusChange.bind(this);
        this.confirmStatusChange = this.confirmStatusChange.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    /**
     * [updateStatus: use the current logged-in user's id to update a selected part's status in the DB]
     */
    updateStatus(){
        const params = {status: this.state.pendingStatus, id: this.props.id};
        const url = '/assets/php/updatePartStatus.php';      
        axios.get(url,{params}).then(resp=>{
                this.setState({
                    status:resp.data.data.status,
                    pendingStatus:resp.data.data.status,  
                }); 

            }).catch(err => {
                // console.log('error is: ', err);
                this.props.history.push('/error');                
            }
        );
        window.location.reload();  
    }

    statusChange(event) {
        this.setState({pendingStatus: event.target.value});
       
    }

    cancelStatusChange(){
        this.setState({pendingStatus: this.state.status});
  
    }
    
    confirmStatusChange(){
        this.updateStatus();
    }
        

    render(){
        let confirmButton = <button className="confirmButton" onClick={this.confirmStatusChange}>Yes</button>;
        let cancelButton = <button className="cancelButton" onClick={this.cancelStatusChange}>No</button>;

        if (this.state.isLoading) {
            return (
                <div className='container'>
                    <Loading />
                </div>
            );
        }
        
        if(this.state.status !== this.state.pendingStatus){
                switch(this.state.pendingStatus){
                   case "available":
                        return (
                            <div className='draftEditContainer'>    
                                <h3>Confirm?</h3>
                                {confirmButton}
                                {cancelButton}
                            </div>  
                        )
                    case "sold":
                        return ( 
                            <div>    
                                <h3>Are you sure you want to mark this part as sold?</h3>
                                {confirmButton}
                                {cancelButton}
                            </div>
                            )   
                    case "shipped":
                        return (
                            <div> 
                                <h3>Would you like to add a tracking number?</h3>
                                {confirmButton}
                                {cancelButton}
                            </div>  
                        )   
                    case "draft":
                        return ( 
                            <div className='draftEditContainer'>    
                                <h3>Confirm?</h3>
                                {confirmButton}
                                {cancelButton}
                            </div>    
                        )
                    case "unavailable":
                        return (
                            <div>    
                                <h3>Are you sure you want make your part unavailable?</h3>
                                {confirmButton}
                                {cancelButton}
                            </div>
                        )
                    case "deleted":
                        return (
                            <div className='draftEditContainer'>    
                                <h3>Delete?</h3>
                                {confirmButton}
                                {cancelButton}
                            </div>
                        )
            
                    default:
                        return
                }
            } else {        
                return  (
                    <div className="statusUpdateDropdown">
                            <select onChange={this.statusChange} value={this.state.status} name="status" type="text">
                                <option value="available">Active</option>
                                <option value="draft">Draft</option>
                                <option value="deleted">Remove</option>          
                            </select>
                    </div>
                    );    
            }
        }
}

export default UpdatePartStatus;