import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Season from './Season';
class SeasonList extends Component {
    constructor(props){      
        super(props)
        this.state = {
            seasonIndex:1,
        }
    }

    componentDidMount(){
        this.getSeasons(this.props.episodes)
        this.listEpisodes(this.state.seasonIndex)
    }


    setButton(button){
        // console.log("page in setPage", page);
        const {buttons} = this.state;
        this.listEpisodes(button);
    }

    
    seasonButtons(seasons) {
         console.log("!!!seasons ", seasons);
        const seasonBtns = []; 
        if (!seasons) {return };
        for(let i = 1; i < seasons.length+1; i +=1 ) 
        {
            seasonBtns.push( 
                <Button variant="outlined" type="button" onClick={() => this.setState({seasonIndex: i})} key={i} className={`button-${i}`}>
                     Season {i}  
                </Button> )
                
        }
        // console.log("pagebuttons",buttons);
        this.setState({buttons: seasonBtns});
        console.log("seasonBtns", seasonBtns)
    }

    listEpisodes(season){
        const {episodes} = this.props;
        console.log("season", season);
        console.log("season on props ", episodes);
        if (season) {       
        const episodeList = episodes
        .filter((episode) => {return (episode.season === season)})
        .map((episode) => {
            console.log("episode", episode);
                return (
                <Season
                    season={episode.season}
                    episode={episode.episode}
                    name={episode.name}
                    air_date={episode.air_date}
                    key={episode.name}
                />
                )
            });
            //this.setState({episodeList})
            console.log("episodeList",episodeList);
            console.log("this.state",this.state);
            return episodeList;
        }
    }


    getSeasons(){
        const {episodes} = this.props;
        console.log("this.props.episodes", episodes);
        if (episodes) {
            const counts = {};
            for(let i = 0; i < episodes.length; i++){ 
                if (counts[episodes[i].season]) {
                counts[episodes[i].season] += 1               
                } else {
                counts[episodes[i].season] = 1
                }
            }
            let seasons = [];
            for (let s in counts){
                if (counts[s] >= 1){
                    seasons = [...seasons, s];                   
                }
            }
            this.setState({buttons: seasons})
            console.log("seasons,", seasons);
            return (this.seasonButtons(seasons))
        }
    }


    render() {
        const {buttons, seasonIndex} = this.state;
        const episodes = this.listEpisodes(seasonIndex);

        return ( 
            <div>
                <div className="container text-center">
                    {buttons && buttons }    
                </div>

                <table className="table table-striped" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Title</th>
                          <th scope="col">Air date & time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes}
                    </tbody>
                </table>
            </div>

         );
    }
}
 
export default SeasonList;