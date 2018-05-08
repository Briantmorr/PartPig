import React, {Component} from 'react';
import ImageGallery from './imageGallery';
import PartInfo from './partInfo';
import {Link} from 'react-router-dom';
import Loading from '../tools/loading/loading';
import axios from 'axios';

class PartDetails extends Component {
        
    constructor(props){
        super(props);
        this.state = {
            partInfo:{},
            isLoading: false,
            newPart: false  //when the user list the part          
        }          
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        //call the server to get the information of that specific part
        if(id){
            const url = '/assets/php/singleItemDetail.php';
            const params = {id};      
            axios.get(url,{params}).then(resp=>{  
                
                    let newPart = this.props.match.params.newPart;
                    if(!newPart){
                        newPart = false;
                    }
                    this.setState({
                        partInfo:resp.data.data[0],
                        isLoading: true,
                        newPart: newPart            
                    }); 
                    if(this.props.match.params.fromDashboard=='true'||this.props.match.params.newPart=='true'){
                        this.oldPartInfo = resp.data.data[0];
                    }
                }).catch(err => {
                    // console.log('error is: ', err);
                    this.props.history.push('/error');                
                }
            ); 
        }
    } 

    render(){

        let linkBack = (<div className="goBack"> 
                        <button className='button-link' onClick={()=>this.props.history.goBack()}>Go Back</button>
                        </div>
                        );
        
        if(this.props.match.params.newPart == 'true'){
            linkBack ='';
        }

        if (!this.state.isLoading) {
            return (
                <div className='container'>
                    <Loading />
                </div>
            );
        }

        return (
            <div className="partDetails container">
                {linkBack}
                <ImageGallery imageClass='imageDetailsContainer' showList={true} mainImage = {this.state.partInfo.images[0]} imageList = {this.state.partInfo.images}  isDetails={true} />
                <PartInfo newPart={this.state.newPart} fromDashboard={this.props.match.params.fromDashboard} {...this.props} infoClass='productDetailsContainer' partInfo={this.state.partInfo}  isDetails={true} />
            </div> 
        );
    }
}

export default PartDetails;