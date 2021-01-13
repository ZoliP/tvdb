import React, { Component } from 'react';
import Details from './details';
import TvShow from './tvshow';

class SearchResultList extends Component {

    constructor(props){      
        super(props);
        this.state = {};
        this.showDetails = this.showDetails.bind(this);
    }

    showDetails(id) {
        this.setState({id});        
    }

    hideDetails() {
        this.setState({id: undefined});        
    }

    render() { 
        const {id} = this.state;           
        const {tv_shows} = this.props;           
        console.log("tv_shows ", tv_shows); 

        const list = tv_shows.map((tv_show) => {
          return (
              <TvShow
                 key={tv_show.id}
                 tvShow={tv_show}
                 id={tv_show.id}
                 name={tv_show.name}
                 image_thumbnail_path={tv_show.image_thumbnail_path}
                 start_date={tv_show.start_date}
                 network={tv_show.network}
                 description={tv_show.description}
                 onShowDetails={this.showDetails}
              />                        
              )
          });
          console.log("list", list);
     
        

        return (
            <div>
              {!id && list}
              {id && <Details id={id} onHideDetails={this.hideDetails.bind(this)}/>}
            </div>  
        );
    }
}
 
export default SearchResultList;