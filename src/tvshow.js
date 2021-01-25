import React, { Component } from 'react';
import './Tvshow.css';

class TvShow extends Component {

  onShowDetails() {
    this.props.onShowDetails(this.props.id);
  }  

  render() {     
    const { image_thumbnail_path, name, start_date, network,description} = this.props;   
    return ( 
      <div id="card" className="cards card bg-light ">
        <a href="#" onClick={this.onShowDetails.bind(this)}>
          <img
            className="card-img-top"
            src={image_thumbnail_path}
            alt="image_thumbnail"
          />            
          <div className="card-body">
            <h5 className="card-title">{name}</h5>        
          </div>
          <ul className="list-group list-group-flush ">
            <li className="list-group-item bg-light">
              Start date: <strong>{start_date}</strong>
            </li>          
            <li className="list-group-item bg-light">
              Station: <strong>{network}</strong>
            </li>          
            <li className="list-group-item bg-light">
              {description}
            </li>          
          </ul>
        </a>                   
      </div>
    );
  }
}
 
export default TvShow;