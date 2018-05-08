import React, {Component} from 'react';
import './userParts/userParts.css';
import {Link} from 'react-router-dom';
import Loading from '../tools/loading/loading';
import axios from 'axios';
import UpdatePartStatus from "./userParts/updatePartStatus";


class UserDrafts extends Component {
        
    constructor(props){
        super(props);
        this.state = {
            partInfo:{},
            isLoading: false,
            seller_id: props.userId          
        }
    }

    /**
     * [componentDidMount: use seller_id to retrieve all the parts that were listed by that user]
     * @return {promise} [data contains info for all the parts and the 1st image of each part]
     */
    componentDidMount(){
        const seller_id = this.state.seller_id;
        const url = '/assets/php/allPartBySeller.php';
        const params = {seller_id};      
        axios.get(url,{params}).then(resp=>{               
                this.setState({
                    partInfo:resp.data.data,
                    isLoading: true           
                }); 
            }).catch(err => {
                // console.log('error is: ', err);
                this.props.history.push('/error');                
            }
        ); 
    } 

    render(){
        if (!this.state.isLoading) {
            return (
                <div>                    
                    <Loading />
                </div>
            );
        }

        let part = this.state.partInfo;
        const list = part.map((item,index)=>{
            if(item.status === "draft"){
            let id = item.id;
            let status = item.status;
            return  (
                <div key={index} className="dashboardPart">
                    <img className="dash-mainImage alignMiddle" src={item.images}></img>
                    <div className="listingId alignMiddle">{item.id}</div>
                    <div className="dash-partNumber alignMiddle">{item.part_number}</div>
                    <div className="brand alignMiddle"> {item.brand} </div>
                    <div className="partName alignMiddle">{item.part_name}</div>
                    <div className="fitment alignMiddle"> {item.make} {item.model} {item.year}</div>
                    <div className="price alignMiddle">${parseFloat(item.price_usd)}</div>
                    <div className="statusUpdateContainer">
                    <Link className="button-link editPart" key={index} to={"/partdetails/" + item.id+'/true'}>Edit</Link> 
                    <UpdatePartStatus id = {id} status = {status}/></div> 
                 </div>
                 );
            } else {
                return
            }                    
        });

        return  (
            <div className="userPartsContainer"> 
            <h2>Your Drafts</h2>    
                <div className="userPartsList">
                    <div className="listingColumns">
                        <div className="title-mainImage">Main Image</div>
                        <div className="title-listingId">Listing Id</div>
                        <div className="title-partNumber">Part Number</div>
                        <div className="title-brand">Brand</div>
                        <div className="title-partName">Part Name</div>
                        <div className="title-fitment">Fitment</div>
                        <div className="title-price">Price</div>
                        <div className="title-status">Status</div>
                    </div>
                    {list}
                </div>
            </div>        
        );
    }
}

export default UserDrafts;