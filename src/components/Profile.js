import React from 'react'
import {connect} from 'react-redux'
import {fetchingUserNews} from '../redux/actionCreator'
import { clearCountryNews } from '../redux/actionCreator'
import NewsCard from './NewsCard.js'
import BBCNews from './BBCNews.js'
import CnnNews from './CnnNews.js'
import LiveVideos from './LiveVideos'
import UserCountryNews from './UserCountryNews'
import {Segment} from 'semantic-ui-react';
import RssFeeds from './RSSFeed'

let Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class Profile extends React.Component{

  componentWillUnmount(){
    this.props.clearCountryNews()
  }

  render(){
    if(this.props.userCountries){
      this.props.userCountries.map(country=>
        this.props.fetchingUserNews(country)
      )
    }
    return(
      <div>
        <div className="videos">
          <LiveVideos/>
        </div>
        <RssFeeds/>
         <div className="user-news-section">
         {localStorage.token?
           <UserCountryNews/>:
          null}
          </div>
      </div>
    )
  }
}

// <Segment className="stream" style={{overflow: 'auto', maxHeight: 550 }}>
//   <div >
//     <CnnNews/>
//     <BBCNews/>
//   </div>
 // </Segment>

const mapStateToProps=state=>{
  return{
    userCountries: state.currentUser.countries
  }
}


const mapDispatchToProps = dispatch =>{
  return{
    fetchingUserNews:(country)=>{dispatch(fetchingUserNews(country))},
    clearCountryNews: () => {dispatch(clearCountryNews())}
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Profile))
