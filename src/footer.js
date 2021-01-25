import React, { Component } from 'react';
class Footer extends Component {

    render() {
        const {total, pages, query} = this.props;
        return (  
        <div className="jumbotron jumbotron-fluid text-center bg-dark">
           <div className="container">                  
                <p className="lead text-white">Total result: <strong className="text-warning"> {total} </strong> for <strong className="text-warning"> {query} </strong></p> 
                <p className="lead text-white">on <strong className="text-warning"> {pages} </strong>pages</p> 
            </div>           
        </div>
        );
    }
}
 
export default Footer;
