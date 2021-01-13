import React, { Component } from 'react';
import Season from './season';
class SeasonList extends Component {

    render() { 
        const episodeList = this.props.episodes.map((season) => { 
            return (
                < Season 
                    season={season.season}
                    episode={season.episode}
                    name={season.name}
                    air_date={season.air_date}
                    key={season.name}
                />
            )
        })

        return ( 
            <div>
                <table className="table table-striped" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col">Name</th>
                          <th scope="col">Air date & time</th>
                        </tr>
                    </thead>
                    <tbody>{episodeList}</tbody>
                </table>
            </div>

         );
    }
}
 
export default SeasonList;