import React, { Component } from 'react';
class Season extends Component {

    render() { 
        const {season, episode, name, air_date} = this.props;
        return ( 
            <tr>     
                <th>Season {season}</th>
                <td>Episode {episode}</td>
                <td>{name}</td>
                <td>{air_date}</td>                
          </tr>     
         );
    }
}
 
export default Season;