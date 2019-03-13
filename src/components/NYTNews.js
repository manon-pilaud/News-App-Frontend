import React from 'react'
import {connect} from 'react-redux'
import NewsCard from './NewsCard.js'
let Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class NYTNews extends React.Component{
  constructor(){
    super()
    this.state={
      NytNewsFeed: ""
    }
  }
    getNytnews=()=>{
      let parser = new Parser();
      const nytPromise = (async () => {
        let feed = await parser.parseURL(CORS_PROXY + "http://rss.nytimes.com/services/xml/rss/nyt/World.xml" );
        let nytArray = []
        feed.items.forEach(item => {
          nytArray.push(item)
        });
        return nytArray
      })();
      nytPromise.then(info=> {
        this.setState({
          NytNewsFeed: info
        })
      })
    }

  componentDidMount(){
      this.getNytnews()
  }

  render(){
    return(
      <div>
        {this.state.NytNewsFeed?
        <div>
          <center><h4>N.Y.T  BREAKING NEWS</h4></center>
          {this.state.NytNewsFeed.map((news,index)=><NewsCard key={index} newsInfo={news}/>)}
        </div>
        :null}
      </div>
    )
  }
}



export default NYTNews
