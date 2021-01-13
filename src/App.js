import React, { Component } from 'react';
import Search from "./search";
import Header from "./header";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: null,
      total: null,
      page: 1,
      pages: null,
      tv_shows: [],
  }
  }
  render() { 
    return (
      <div className="bg-light">
        <Header/>
        <Search/>         
      </div>

      );
  }
}
 
export default App;