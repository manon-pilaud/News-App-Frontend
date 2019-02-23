import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {fetchingArticles} from '../redux/actionCreator'
import ArticleList from './ArticleList'
class Country extends Component {
  componentWillReceiveProps(nextProps) {
    this.props.fetchingArticles(nextProps.country)
   }
  render() {
    return !this.props.country?null:(
        <div>
          <center><h1>{this.props.country.name}</h1></center>
          <ArticleList/>
        </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
    let countryId = parseInt(ownProps.match.params.id)
  return{
    country: state.countries.find(country=>
      country.id === countryId)
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    fetchingArticles:(country)=>{dispatch(fetchingArticles(country))}
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Country));
