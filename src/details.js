import React, { Component } from 'react';
import './details.css';
import Button from '@material-ui/core/Button';
import SeasonList from './seasonList';

class Details extends Component {
    constructor(props){      
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.showDetails(this.props.id)
    }

    showDetails(id) {
        const url = `https://www.episodate.com/api/show-details?q=${id}`;
        if (id) {
            fetch(url, {
                method:'GET'            
            })
            .then(results =>{return results.json();
            })
            .then(data => {console.log("detail data", data);
            console.log("data.tvShow.genres",data.tvShow.genres);       
            const genreList = data.tvShow.genres.map((item) => {return ( item + "|")});            

            console.log("genreList", genreList);
            this.setState({
                id: data.tvShow.id, 
                name: data.tvShow.name, 
                image_path: data.tvShow.image_path, 
                status: data.tvShow.status,
                genres: genreList,
                rating: data.tvShow.rating, 
                rating_count: data.tvShow.rating_count, 
                description: data.tvShow.description,
                episodes: data.tvShow.episodes
            });
            console.log("details state", this.state);

        });
        }       
    }

    getDay(){
        console.log(" date raw format", this.state.episodes);
        if (this.state.episodes) {
            const list = this.state.episodes.map((item) => {return(item.air_date)});
            const date = Date.parse(list[0]);        
            const option = {weekday: 'long'}; 
            if (date)
            {return (new Intl.DateTimeFormat('en-US', option).format(date))   }
        }
    }

    stars(){
        const starTotal = 10,
            ratingValue = this.state.rating,
            starPercentage = (ratingValue / starTotal ) * 100,
            starPercentageRounded = `${starPercentage / 10 * 10}%`;
            console.log("starPercentage", starPercentage );
            console.log("starPercentageRounded", starPercentageRounded );
            const styleWidth = {  
                position: 'absolute',
                top: 0,
                left: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: starPercentageRounded,
            }


      return(      
            <div className="stars-outer">
                <div id="fill" className="stars-inner" style={styleWidth}> </div>
            </div>
        
        )

    }

    precisionValue(){
        const num = parseFloat(this.state.rating),
            prec = (num.toPrecision(2));    
        if (prec) {return prec}
        }

    render() {
        const {name, image_path, status, genres, description, episodes } = this.state,
            dayName = this.getDay(),
            ratingStar = this.stars(),
            precision = this.precisionValue();

        return ( 
            <div>
                <div className="media">
                    <img className="img-fluid mr-3" src={image_path} alt="image_path"/>
                    <div className="media-body">
                        <h4 className="mt-0">{name}</h4>
                        <p>{description}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Air Day:</strong> {dayName}s </p>                     
                        <p><strong>Genre: </strong>|{genres} </p>
                        <div className="star"><strong>Rating: </strong>                      
                            {ratingStar} ({precision})
                        </div>
                                                
                        
                        <br/>              
                    </div>
                </div>
                {episodes &&
                    <SeasonList episodes = {episodes}/>}
                <br/> 
                <div className="container">
                    <Button className=" container text-center" variant="outlined" color = "primary" size="large" onClick={this.props.onHideDetails}>Back </Button>
                </div>
                <br/> 
            </div>
         );
    }
}
 
export default Details;