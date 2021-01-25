import React, { Component } from 'react';
import SearchResultList from './Searchresultlist'
class FirstPage extends Component {
    constructor(props){      
        super(props)
        this.state = {}
    }    

    render() { 
        const {buttons, tv_shows, endPage, page } = this.props;
        return ( 
            <div>
                {tv_shows && 
                <>
                    <SearchResultList 
                        tv_shows={tv_shows} 
                        endPage = {endPage} 
                        page = {page}
                    />
                    <div className="container text-center">
                        {buttons && buttons.slice(0,endPage) }    
                    </div>
                </>   
                }  
            </div>
        );
    }
}
 
export default FirstPage;