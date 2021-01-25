import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Footer from './Footer';
import SearchResultList from './Searchresultlist';

class Search extends Component {
    slicedButtons = [];
    constructor(props){      
        super(props)
        this.state = {
            query: null,
            total: null,
            page: 1,
            pages: 1,
            tv_shows: [],
            pageButtons: null,
            buttons: null, 
            data: {},
        }
    }
    componentDidMount() {
        this.searchShow(this.state.query, this.state.page);
    }

    setPage(page){
        // console.log("page in setPage", page);
        const {query, buttons} = this.state;
        this.slicedButtons = buttons?.slice(page-1,page+4);
        this.searchShow(query, page);
    }
    
    generatePageButtons(page) {
        // console.log("page in search pageButtons", page);
        const buttons = []; 
        if (!page) {return };
        for(let i = 1; i < page+1; i +=1 ) 
        {
            buttons.push( 
                <Button id="pageBtns" type="button" onClick={() => this.setPage(i)} key={i} className={`button-${i}`}>
                   {i}
                </Button> )
        }
        // console.log("pagebuttons",buttons);
        this.setState({buttons});
    }

    onChange(e) {
        // console.log("event", e);
        this.setState({ query: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const {query,page} = this.state;
        // console.log("event", e);
        if (this.state.query && this.state.query.length > 1) {
            this.searchShow(query, page);
        }
        document.getElementById("input").value = "";   
    }

    searchShow(query, page) {
        // console.log("query",this.state.query);
        // console.log("page",this.state.page);
        const url = `https://www.episodate.com/api/search?q=${query}&page=${page}`;
        if (query) {          
            fetch(url, {
                method: 'GET'
            }).then(results => {               
                return results.json();
            }).then(async data => {           
                console.log("data", data);               
                console.log("pageButtons", data.pages);
                for (const tv_show of data.tv_shows) {
                    const detailsUrl = `https://www.episodate.com/api/show-details?q=${tv_show.id}`;
                    const response = await fetch(detailsUrl);
                    const details = response && await response.json();
                    tv_show.description = details && details.tvShow.description.slice(0, 100) + '...';
                }
                this.generatePageButtons(data.pages);  
                this.setState({ pageButtons: data.pages, total: data.total, pages: data.pages, tv_shows: data.tv_shows });
                // console.log("TTTThe state", this.state);           
            })
            .catch(e => console.log( "Error:",e ));       
        }    
    }

    render() {
        const { tv_shows, total, buttons } = this.state;  
        // console.log(this.state.pageButtons);
        // console.log("state buttons ", this.state.buttons);
        const endPage = this.state.pageButtons; 
        // console.log("endPage ", endPage);
        // console.log("this.state.data.tv_shows ", this.state.data.tv_shows);
        // console.log("tv_shows ", tv_shows);

        return (                      
            <div> 
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group text-right">
                        <Button className="text-left" onClick={this.props.onShowFirstPage}>Home</Button>
                        <input
                        id="input"
                        type="text"
                        className="col-4"
                        placeholder="Search for the show"  
                        onChange={this.onChange.bind(this)}
                        />
                        <Button type="submit" onClick = {this.props.onHideFirstPage}>
                            <SearchIcon/>
                        </Button> 
                    </div>
                </form>                             
                {tv_shows && 
                    <SearchResultList 
                        tv_shows = {tv_shows} 
                        endPage = {endPage} 
                        buttons = {buttons}
                    />
                }  
                {tv_shows && total && 
                    <Footer 
                        total = {this.state.total}
                        pages = {this.state.pageButtons}
                        query = {this.state.query}
                    />  
                }
            </div>
        );
    }
}
 
export default Search;