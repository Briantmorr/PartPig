import React, { Component } from 'react';
import './home.css';


class ContentColumn extends Component{

    constructor(props){
      super(props);
      this.state = {
        blockHeight: 100/props.displaySize,
        images: props.images
      }
    }
    componentDidMount(){
      this.itemHeight = this.column.clientHeight / this.props.displaySize;
    }

    makeAllPictures(array){
      return array.map( (item, key) => this.makePicture(item, key))
    }

    makePicture(image, key){
      const styling = {
        backgroundImage: `url(/images/${image})`,
        height: this.state.blockHeight + 'vh',
      }
      return (<div className='scrollingImg' style={styling} key={key}></div>)
    }
    
    render(){
      return (
      <div className="scrollingImgColumn" ref={ element => this.column=element}>
          {this.makeAllPictures(this.state.images)}
      </div>)
    }
  }
  
  export default ContentColumn