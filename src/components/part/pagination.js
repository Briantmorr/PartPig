import React, {Component} from 'react';
import Part from './part';
import NoResults from '../tools/noResults/noResults';

class Pagination extends Component {
        
    constructor(props){
        super(props);
        this.state = {
            currentParts:[],
            numPages: 0,
            currentPage:0,
            changePage:true           
        }
        this.partsPerPage = 12;    
        this.handleButtonOnClick = this.handleButtonOnClick.bind(this);      
    }

    componentWillReceiveProps(newProps){    
        //we change the data and num of pages when the parts information change probably for the filters
        if(this.props.allParts !== newProps.allParts){
            const allParts = newProps.allParts;
            //calculate the num of pages
            const numPages = Math.ceil(allParts.length / this.partsPerPage);
            //we only show the parts of the current page
            const currentParts = allParts.slice(this.partsPerPage*this.state.currentPage,(this.partsPerPage)+(this.partsPerPage*this.state.currentPage));

            this.setState({
                currentParts:currentParts,
                numPages: numPages, 
                changePage: false
            });
        }        
    }

    componentDidUpdate(){

        if(this.state.changePage){
            const allParts = this.props.allParts;
            //calculate the num of pages
            const numPages = Math.ceil(allParts.length / this.partsPerPage);
            //we only show the parts of the current page
            const currentParts = allParts.slice(this.partsPerPage*this.state.currentPage,(this.partsPerPage)+(this.partsPerPage*this.state.currentPage));

            this.setState({
                currentParts:currentParts,
                numPages: numPages, 
                changePage: false
            });
        }
    }

    handleButtonOnClick(event){
        let numPage = event.target['id'];
        //we move the focus to the top of the window
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        switch(numPage){
            case 'first':
                numPage = 0;
                break;
            case 'previous':
                numPage = this.state.currentPage-1;
                break;
            case 'next':
                numPage = this.state.currentPage+1;
                break;
            case 'last':
                numPage = this.state.numPages-1;
                break;
            default:  
                numPage = parseInt(numPage);
        }
        this.setState({
            currentPage: numPage,
            changePage: true
        });
    }

    render(){
        let list = "";
        //if we don't have any results we show a specific message
        if(this.state.currentParts.length === 0){
            list = <NoResults/>
        };
        
        list = this.state.currentParts.map((function(item,index){
            return ( 
                <div key={index} className='singlePart'>                  
                    <Part cartParts={this.props.cartParts} addCart={this.props.addCart} history={this.props.history} imageClass={this.props.showFilters ? 'imageContainer imageContainerFilter' : 'imageContainer'} infoClass='productContainer' partInfo={item}/>                                      
                </div>
            )           
        }).bind(this));

        let pageButtons = [];
        if(this.state.numPages > 0){  
            //calculate the min and max number to show in the pagination
            let min = this.state.currentPage-2 > 0 ? this.state.currentPage-2 : 0;
            let max = min+5 < this.state.numPages ? min + 5 : this.state.numPages;
            if(max === this.state.numPages){
                min = max - 5 > 0 ? max - 5 : 0;
            }
            
            
            if(this.state.currentPage > 0){
                pageButtons.push(<button onClick={this.handleButtonOnClick} id='first' key='first' className='pageButton'>«</button>);
                pageButtons.push(<button onClick={this.handleButtonOnClick} id='previous' key='previous' className='pageButton'>‹</button>);
            }
            for(let i=min; i < max; i++){
                let classButton = 'pageButton';
                if(i == this.state.currentPage){
                    classButton += ' pageButtonActive';
                }
                pageButtons.push(<button onClick={this.handleButtonOnClick} id={i} key={i} className={classButton}>{i+1}</button>);
            }
            if(this.state.currentPage < this.state.numPages-1){
                pageButtons.push(<button onClick={this.handleButtonOnClick} id='next' key='next' className='pageButton'>›</button>);
                pageButtons.push(<button onClick={this.handleButtonOnClick} id='last' key='last' className='pageButton'>»</button>);
            }
        }

        return (
            <div>
                {list}
                <div className='pagesContainer'>
                    {pageButtons}
                </div>
            </div>            
        );
    }
}

export default Pagination;