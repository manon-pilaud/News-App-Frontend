import React from 'react'
import {connect} from 'react-redux'
import {fetchingUserNews} from '../redux/actionCreator'
import NewsCard from './NewsCard.js'
import BBCNews from './BBCNews.js'
import CnnNews from './CnnNews.js'
import UserCountryNews from './UserCountryNews'
let Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class Profile extends React.Component{
  // componentWillReceiveProps(nextProps){
  //   //Should switch this to not unsafe
  //     nextProps.userCountries.map(country=>
  //       this.props.fetchingUserNews(country)
  //     )
  // }
  render(){
    if(this.props.userCountries){
      this.props.userCountries.map(country=>
        this.props.fetchingUserNews(country)
      )
    }
    return(
      <div>
        <CnnNews/>
        <BBCNews/>
        <UserCountryNews/>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    userCountries: state.currentUser.countries
  }
}


const mapDispatchToProps = dispatch =>{
  return{
    fetchingUserNews:(country)=>{dispatch(fetchingUserNews(country))}
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Profile))
