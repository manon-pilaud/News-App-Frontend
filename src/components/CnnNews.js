import React from 'react'
import {connect} from 'react-redux'
import NewsCard from './NewsCard.js'
let Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class CnnNews extends React.Component{
  constructor(){
    super()
    this.state={
      CnnNewsFeed: ""
    }
  }
    getCnnnews=()=>{
      let parser = new Parser();
      const cnnPromise = (async () => {
        let feed = await parser.parseURL(CORS_PROXY + "http://rss.cnn.com/rss/edition_world.rss" );
        let cnnArray = []
        feed.items.forEach(item => {
          cnnArray.push(item)
        });
        return cnnArray
      })();
      cnnPromise.then(info=> {
        this.setState({
          CnnNewsFeed: info
        })
      })
    }

  componentDidMount(){
      this.getCnnnews()
  }

  render(){
    return(
      <div>
        {this.state.CnnNewsFeed?
        <div>
          <center><h4>CNN BREAKING NEWS</h4></center>
          {this.state.CnnNewsFeed.map((news,index)=><NewsCard key={index} newsInfo={news}/>)}
        </div>
        :null}
      </div>
    )
  }
}



export default CnnNews
