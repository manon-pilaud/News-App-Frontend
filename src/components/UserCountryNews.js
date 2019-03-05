import React from 'react'
import ArticleUserNewsList from './ArticleUserNewsList.js'
import {connect} from 'react-redux'
class UserCountryNews extends React.Component{

  render(){
    return(
      <div>
      {this.props.userCountryNews?
        <div>
        {
        Object.keys(this.props.userCountryNews).map(function(keyName, keyIndex) {
            return <ArticleUserNewsList key={keyIndex} countryName={keyName}/>
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
