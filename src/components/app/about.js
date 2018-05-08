import React, { Component } from 'react';
import contact from './about-info';
import './about.css';
import githubIcon from '../../assets/images/contact-icons/github-icon.png';
import linkedinIcon from '../../assets/images/contact-icons/linkedIn-icon.png';

class AboutPage extends Component {

    render(){
        const contactElements = contact.map((item, index) => {
            return (
                <div className="users" key={index}>
                    <div className='person'>
                        <div className={`bobbleHead${index+1} head`} ></div>
                        <div className="bobbleBody"></div>
                    </div>
                    <div className="infoContainer">
                        <div className="userName">{item.name}</div>
                        <div className="userRole">{item.role}</div>
                        <div className="contactIcons">
                            <div className="githubLink">
                                <a onClick={() => window.open(`${item.github}`, "_blank")}><img src={githubIcon}/></a>
                            </div>
                            <div className="linkedInLink">
                                <a onClick={() => window.open(`${item.linkedin}`, "_blank")}><img src={linkedinIcon}/></a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

        return(
            <div className="aboutUsContainer">
                <div className='innerContainer'>
                    {contactElements}
                </div>
            </div>
        )
    }
}

export default AboutPage;