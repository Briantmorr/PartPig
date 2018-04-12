import React from 'react';
import ImageGallery from './imageGallery/imageGallery';
import PartInfo from './partInfo/partInfo';
import {Link} from 'react-router-dom';
import './part.css'

const Part = (props) => {
        
    return (
        <div className="part">
            <Link to={"/partdetails/" + props.partInfo.id + '/' + JSON.stringify(props.filters)}>  
                <ImageGallery imageClass={props.imageClass} showList={false} mainImage = {props.partInfo.images[0]} />
            </Link>  
            <PartInfo {...props} isDetails={false}/>
        </div> 
    );
}

export default Part;