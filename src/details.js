import React, { Component } from 'react';
import './Details.css';
import Button from '@material-ui/core/Button';
import SeasonList from './SeasonList';

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
            .then(data => {
                // console.log("detail data", data);
                // console.log("data.tvShow.genres",data.tvShow.genres);       
                const genreList = data.tvShow.genres.map((item) => {
                    if (!item) { return 0
                    }else{
                        return ( item + "|")
                    }
                });            
                // console.log("genreList", genreList);
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
                // console.log("details state", this.state);
            });
        }      
    }

    getDayName(){
        // console.log(" date raw format", this.state.episodes);
        if (this.state.episodes) {
            const list = this.state.episodes.map((item) => {
                const date = Date.parse(item.air_date);
                return(new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date))
            });
            //search and count for duplicates
            const counts = {};
            for(let i = 0; i < list.length; i++){ 
                if (counts[list[i]]) {
                counts[list[i]] += 1               
                } else {
                counts[list[i]] = 1
                }
            }
            let airDays = [];
            for (let days in counts){
                if (counts[days] >= 1){
                    airDays = [...airDays, days];                   
                }
            }
            console.log("airdays,", airDays);
            return (airDays + " ")
        }
    }

    ratingStars(){
        const starTotal = 10,
            ratingValue = this.state.rating,
            starPercentage = (ratingValue / starTotal ) * 100,
            starPercentageRounded = `${starPercentage / 10 * 10}%`;
        // console.log("starPercentageRounded", starPercentageRounded );
        const styleWidth = {  
            position: "absolute",
            top: 0,
            left: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: starPercentageRounded,
        }
        return(      
            <div className="stars-outer">
                <div className="stars-inner" style={styleWidth}> </div>
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
            dayName = this.getDayName(),
            stars = this.ratingStars(),
            precision = this.precisionValue();
            console.log("episodes ",episodes);

        return ( 
            <div>
                <div className="media bg-light">
                    <img className="img-fluid mr-3" src={image_path} alt="image_path"/>
                    <div className="media-body">
                        <h4 className="mt-0">{name}</h4>
                        <p>{description}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Air Day:</strong> {dayName} </p>                     
                        <p><strong>Genre: </strong>|{genres} </p>
                        <div className="star"><strong>Rating: </strong>                      
                            {stars} ({precision})
                    </div>
                    <br/>             
                    <div className="aling-left" >
                        <Button variant="outlined" color = "primary" size="large" onClick={this.props.onHideDetails}>Back</Button>
                    </div>
                </div>
            </div>
            {episodes &&
                <SeasonList episodes = {episodes}/>}
            <br/> 
            </div>
        );
    }
}
 
export default Details;