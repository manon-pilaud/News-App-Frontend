import React from 'react'
import ArticleUserNewsList from './ArticleUserNewsList.js'
import {connect} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

class UserCountryNews extends React.Component{
  state={
    selectedCountry:""
  }

  filterCountryNews=(e)=>{
    this.setState({
      selectedCountry: e.target.value
    })
  }



  render(){
    return(
      <div className="user-news-countries-div">
        <h2>Your Countries Top Stories</h2>
      {this.props.userCountryNews?
        <div className="user-news-countries-div">
          <select onChange={(e)=>this.filterCountryNews(e)} className="country-select">
            <option value="">Select Country:</option>
              {Object.keys(this.props.userCountryNews).map(function(keyName, keyIndex) {
                  return <option value={keyName}>{keyName}</option>
              })
            }
          </select>
        {!this.state.selectedCountry?
        <div >
        {
        Object.keys(this.props.userCountryNews).map(function(keyName, keyIndex) {
            return <ArticleUserNewsList key={keyIndex} countryName={keyName}/>
        })
      }
    </div>: <ArticleUserNewsList countryName={this.state.selectedCountry}/>
    }
        </div>
      :<div>You are not following any countries</div>}
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
