import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
 
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      images: props.images
    };
  }

  render() {
      let imagesToUpload = this.props.images.map((item,index)=>{      
        return (<div key={index} className="imgThumbContainer">
                  <img className="imgThumb" name = {item} src={item.imagePreviewUrl}/>
                  <button onClick={this.props.deleteImage} type='button' name = {item.imagePreviewUrl} className="removeImg">X</button>
                </div>);        
      });
      return (
        <section className="imageSection">
          <div className="imageUploadContainer">
            <Dropzone imgarray={this.props.images} className="dropZone" onDrop={this.props.handleImageChange} 
              accept="image/jpeg, image/png">
                <p>Drop or Click here to upload images</p>
            </Dropzone>             
            <div className='displayImages'>
              {imagesToUpload}
            </div>            
          </div>
          <div className="help-block">{this.props.error}</div>  
        </section>
      );
    }
}


export default ImageUpload;



