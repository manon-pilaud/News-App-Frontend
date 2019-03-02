import React from 'react'
import {connect} from 'react-redux'
import {fetchingBBC,fetchingCNN} from '../redux/actionCreator'
let Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class Profile extends React.Component{
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
      this.props.fetchingBBC()
      //Figure out why this is not working with redux
      this.props.fetchingCNN()
      this.getBBCnews()
  }

  render(){
    return(
      <div>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    bbcFeed: state.bbcNews,
    cnnNews: state.cnnNews
  }
}


const mapDispatchToProps = dispatch =>{
  return{
    fetchingBBC: ()=>{dispatch(fetchingBBC())},
    fetchingCNN: ()=>{dispatch(fetchingCNN())}
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Profile))
