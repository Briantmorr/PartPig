import React, {Component} from 'react';


class ImageGallery extends Component{

    constructor(props){
        super(props);

        this.state = {
            mainImg:props.mainImage
        }        

        this.changeList = false;
        this.handleClickImg = this.handleClickImg.bind(this);
    }
  
    /**
     * Handle click for every image in the list to change the image in the main container
     * 
     * @param {*} event 
     */
    handleClickImg(event){
        let src = event.target.name;
        this.changeList = true;
        this.setState({
            mainImg:src
        });
    }
    
    componentDidUpdate(){
        //we only update the main image when change and we don't have the list
        if(this.state.mainImg !== this.props.mainImage && !this.changeList){
            this.setState({
                mainImg:this.props.mainImage
            });
        }
    }

    render(){
        
        let list = [];
        var divList = '';
        //control if we need the list of the images or not
        if(this.props.showList){ 
            //we go through every image in the list and create the element           
            list = this.props.imageList.map((item,index)=>{
                return <img key={index} onClick={this.handleClickImg} name = {item} src={item}/>        
            });
            divList = (<div className="imageList"> {list} </div>);
        }
        return(
            <div className={this.props.imageClass}>             
                <div className={this.props.isDetails ? "mainImageDetails" :  "mainImage"}>
                    <img className='mainImageImg' src={this.state.mainImg}/>
                </div>
                {divList}
            </div>
        );
    }
}

export default ImageGallery;