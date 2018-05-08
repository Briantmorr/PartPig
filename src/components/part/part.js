import React from 'react';
import ImageGallery from './imageGallery';
import PartInfo from './partInfo';
import {Link} from 'react-router-dom';
import './part.css'

const Part = (props) => {
        
    return (
        <div className="part">
            <Link to={"/partdetails/" + props.partInfo.id + '/false' }>  
                <ImageGallery imageClass={props.imageClass} showList={false} mainImage = {props.partInfo.images[0]}  isDetails={false} />
            </Link>  
            <PartInfo fromDashboard={false} {...props} isDetails={false}/>
        </div> 
    );
}   

export default Part;


