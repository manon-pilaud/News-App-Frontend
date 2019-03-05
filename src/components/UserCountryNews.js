import React from 'react'
import ArticleUserNewsList from './ArticleUserNewsList.js'
import {connect} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

class UserCountryNews extends React.Component{


  render(){
    return(
      <div>
        <center><h2>Your Countries Top Stories</h2></center>
      {this.props.userCountryNews?
        <div>
      <select>
        <option value="">Select Country:</option>
          {Object.keys(this.props.userCountryNews).map(function(keyName, keyIndex) {
              return <option value={keyName}>{keyName}</option>
          })
        }
      </select>

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
