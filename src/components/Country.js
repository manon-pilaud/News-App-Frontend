import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {fetchingArticles} from '../redux/actionCreator'
import ArticleList from './ArticleList'
import WorldFacts from '../factbook.json'


class Country extends Component {
  componentWillReceiveProps(nextProps) {
    this.props.fetchingArticles(nextProps.country)
   }
  render() {
    return !this.props.country?null:(
        <div>
          <center><h1>{this.props.country.name}</h1></center>
          {WorldFacts.countries[this.props.country.name.toLowerCase()]?
          <div className="country-info">
          <h2>{this.props.country.name} Profile</h2>
          <h3>Quick Facts</h3>
          <h5>Current Leaders:</h5>
          <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.executive_branch.chief_of_state}</p>
          <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.executive_branch.head_of_government}</p>
          <p>Capital: {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.capital.name}</p>
          <p>Government Type: {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.government_type}</p>
          <p>Population: {WorldFacts.countries[this.props.country.name.toLowerCase()].data.people.population.total}</p>

        <h3>Background</h3>
          <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.introduction.background}</p>

          <h3>Economy</h3>
          <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.economy.overview}</p>


          <p>Terrorism</p>
          <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.terrorism.home_based}</p>
          <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.terrorism.foreign_based}</p>
          <p>transnational issues</p>

          <p>Disputes: {WorldFacts.countries[this.props.country.name.toLowerCase()].data.transnational_issues.disputes}</p>
          <p>Illicit Drugs: {WorldFacts.countries[this.props.country.name.toLowerCase()].data.transnational_issues.illicit_drugs.note}</p>
          </div>
          :null}
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
