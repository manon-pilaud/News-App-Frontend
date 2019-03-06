import React from 'react'
import ArticleUserNewsList from './ArticleUserNewsList.js'
import {connect} from 'react-redux'

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
    <div>
      {!this.props.userCountryNews?null:
    <div>

      <div className="country-name-select">
        <center>
          <div id="country-name">
          <h2 >Top Stories For Your Countries</h2>
          </div>
        </center>
        <center>
          <select onChange={(e)=>this.filterCountryNews(e)} className="country-select">
            <option value="">All Countries</option>
              {Object.keys(this.props.userCountryNews).map(function(keyName, keyIndex) {
                  return <option  value={keyName}>{keyName}</option>
              })
            }
          </select>
          </center>
        </div>
        <div className="user-news-countries-div">

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
    </div>}

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
