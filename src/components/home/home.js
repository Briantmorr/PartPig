import React, { Component } from 'react';
import './home.css';
import ContentColumn from './contentColumn';
import Search from '../searchpage/search';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Modal from './startModal/startModal';

class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      images: props.images,
    }
    this.index = 1;
  }
  randomizeArray(array){
    //This splits our total image array into two halves so that columns won't have the same image as the adjacent ones
    let sourceArray = [];
    if(this.index % 2 === 0){
      sourceArray = array.slice(0, 13);
    }
    else{
       sourceArray = array.slice(13, 26);
    }
    this.index++;
    const newArray = [];
    while(sourceArray.length){
      let randomIndex = Math.floor(Math.random()*sourceArray.length);
      newArray.push( sourceArray[randomIndex]);
      sourceArray.splice(randomIndex, 1);
    }
    return newArray;
  }

  render() {
    return (
      <div className="homeMainContainer">
        <Modal/>
        <div className="scrollingBackground">
          <ContentColumn  displaySize={7} images={this.randomizeArray(this.state.images)} />
          <ContentColumn  displaySize={7} images={this.randomizeArray(this.state.images)} />
          <ContentColumn  displaySize={7} images={this.randomizeArray(this.state.images)} />
          <ContentColumn  displaySize={7} images={this.randomizeArray(this.state.images)} />
          <ContentColumn  displaySize={7} images={this.randomizeArray(this.state.images)} />
          <ContentColumn displaySize={7} images={this.randomizeArray(this.state.images)} />
          <ContentColumn  displaySize={7} images={this.randomizeArray(this.state.images)} />
          <div className="shadow">                     
            <Search {...this.props}/>
          </div>
        </div>
      </div>  
    );
  }
}

export default Home;








