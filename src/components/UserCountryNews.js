import React from 'react'
import ArticleUserNewsCard from './ArticleUserNewsCard.js'
import {connect} from 'react-redux'
import {fetchingUserNews} from '../redux/actionCreator'
class UserCountryNews extends React.Component{


  render(){
    return(
      <div>
      {this.props.userCountryNews?
        <div>
        {
        Object.keys(this.props.userCountryNews).map(function(keyName, keyIndex) {
            return<div>{keyName}</div>
        })
      }
        </div>
      :null}
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    userCountryNews: state.userCountryNews
  }
}


export default (connect(mapStateToProps)(UserCountryNews))
