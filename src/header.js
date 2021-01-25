import React, { Component } from 'react';
class Header extends Component {

    render() { 
        return (
            <div className="jumbotron jumbotron-fluid bg-dark">
                <div className="container">
                    <h1 className="display-4 text-white">TV Database</h1>
                    <p className="lead text-white">Find informations about your favorit shows...</p>            
                </div>
            </div>
        );
    }
}
 
export default Header;