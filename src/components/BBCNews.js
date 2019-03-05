import React from 'react'
import {connect} from 'react-redux'
import NewsCard from './NewsCard.js'
let Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class BBCNews extends React.Component{
  constructor(){
    super()
    this.state={
      bccNewsFeed: ""
    }
  }
    getBBCnews=()=>{
      let parser = new Parser();
      const bbcPromise = (async () => {
        let feed = await parser.parseURL(CORS_PROXY + "http://feeds.bbci.co.uk/news/world/rss.xml" );
        let bbcArray = []
        feed.items.forEach(item => {
          bbcArray.push(item)
        });
        return bbcArray
      })();
      bbcPromise.then(info=> {
        this.setState({
          bbcNewsFeed: info
        })
      })
    }

  componentDidMount(){
      this.getBBCnews()
  }

  render(){
    return(
      <div>
        {this.state.bbcNewsFeed?
        <div>
          <center><h4>BBC BREAKING NEWS</h4></center>
          {this.state.bbcNewsFeed.map((news,index)=><NewsCard key={index} newsInfo={news}/>)}
        </div>
        :null}
      </div>
    )
  }
}


export default BBCNews
