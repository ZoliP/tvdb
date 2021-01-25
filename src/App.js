import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Search from "./Search";
import Header from "./Header";
import FirstPage from "./FirstPage";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstQuery: '',
      page: 1,
    }
  }

componentDidMount() {
  this.searchShow(this.state.page);
}

onHideFirstPage(){
  this.setState({firstQuery: "Search for the show"})
}

onShowFirstPage(){
  this.setState({firstQuery: undefined})
}

setPage(page){
  const {buttons} = this.state;
  this.slicedButtons = buttons?.slice(page-1,page+4);
  this.searchShow(page);
}

makePageButtons(page) {
  // console.log("page nr in app", page)
  const buttons = []; 
  if (!page) {return };
  for(let i = 1; i < page+1; i +=1 ) {
    buttons.push( 
      <Button id="pageBtns" type="button" onClick={() => this.setPage(i)} key={i} className={`button-${i}`}>
        {i}
      </Button> 
    )
  }
  this.setState({buttons});
}

  searchShow(page) {  
    const url = `https://www.episodate.com/api/search?page=${page}`;
    if (page) {          
      fetch(url, {
        method: 'GET'
        }).then(results => {               
          return results.json();
        }).then(data => {           
          this.makePageButtons(data.pages);  
          this.setState({ pageButtons: data.pages, total: data.total, pages: data.pages, tv_shows: data.tv_shows });
        }).catch(e => console.log( "Error:",e )
      );       
    }    
  }

  render() {
    const {firstQuery, tv_shows, buttons, pageButtons, page } = this.state;
    return (
      <div className="bg-light">
        <Header/>
        <Search         
          onShowFirstPage = {this.onShowFirstPage.bind(this)}
          onHideFirstPage = {this.onHideFirstPage.bind(this)}
          buttons = {buttons}
          firstQuery = {firstQuery}
        />
        {!firstQuery && 
          <FirstPage 
            searchShow = {this.searchShow}
            tv_shows = {tv_shows}
            buttons = {buttons}
            endPage = {pageButtons}
            page = {page}
          />        
        }          
      </div>
    );
  }
}
 
export default App;