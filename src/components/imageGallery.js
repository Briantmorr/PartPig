import React, {Component} from 'react';
import '../assets/css/product_details.css';


class ImageGallery extends Component{

    constructor(props){
        super(props);

        this.state = {
            mainImg:props.mainImage
        }
        this.imageList = props.imagesList;

        this.handleClickImg = this.handleClickImg.bind(this);
    }

    /**
     * Handle click for every image in the list to change the image in the main container
     * 
     * @param {*} event 
     */
    handleClickImg(event){
        let src = event.target.name;
        this.setState({
            mainImg:src
        });
    }

    render(){
        
        let list = [];
        var divList = '';
        //we control if we need the list of the images or not
        if(this.props.showList){ 
            //we go through every image in the list and create the element           
            list = this.imageList.map((item,index)=>{
                return <img key={index} onClick={this.handleClickImg} name = {item} src={require(`../assets/images/${item}`)}/>        
            });
            divList = (<div className="imageList"> {list} </div>);
        }
        return(
            <div className="imageContainer">             
                <div className="mainImage">
                    <img src={require(`../assets/images/${this.state.mainImg}`)}/>
                </div>
                {divList}
            </div>
        );
    }
}

export default ImageGallery;