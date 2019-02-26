import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {fetchingArticles} from '../redux/actionCreator'
import{fetchingLocalArticles} from '../redux/actionCreator'
import ArticleList from './ArticleList'
import WorldFacts from '../factbook.json'


class Country extends Component {
  componentWillReceiveProps(nextProps) {
    this.props.fetchingArticles(nextProps.country)
    this.props.fetchingLocalArticles(nextProps.country)
  }
  render() {
    return !this.props.country?null:(
        <div>
          <div className="flag-and-header">
          <center><h1>{this.props.country.name}</h1></center>
          <center><button>Follow {this.props.country.name}</button></center>
          <center><img src={`https://www.countryflags.io/${this.props.country.flag}/flat/64.png`}/></center>
          </div>
          {WorldFacts.countries[this.props.country.name.toLowerCase()]?
          <div className="country-info">
          <h2>{this.props.country.name} Profile</h2>
          <h3>Quick Facts</h3>
          <strong>Current Leaders:</strong>
            <ul>
              {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.executive_branch.chief_of_state?
              <li>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.executive_branch.chief_of_state}</li>:null}
              {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.executive_branch.head_of_government?
              <li>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.executive_branch.head_of_government}</li>:null}
            </ul>
            {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.capital?
            <p><strong>Capital:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.capital.name}  {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.capital.capital}</p>
            :<p><strong>Capital:</strong> No capital</p>}
            <p><strong>Government Type:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.government.government_type}</p>
            <p><strong>Population:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.people.population.total}</p>
            <p><strong>Climate:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.geography.climate}</p>
            <p><strong>Languages:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.people.languages.language.map(language=>language.name).join(', ')}</p>
            <p><strong>Ethnicities:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.people.ethnic_groups.ethnicity.map(ethnicity=>ethnicity.name).join(', ')}</p>
          <h3>Background</h3>
            <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.introduction.background.replace(`SUMMARY: PDF`,'')}</p>

            <h3>Economy</h3>
            <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.economy.overview}</p>

            {WorldFacts.countries[this.props.country.name.toLowerCase()].data.terrorism?<div>
            <h3>Terrorism</h3>
            <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.terrorism.home_based}</p>
            <p>{WorldFacts.countries[this.props.country.name.toLowerCase()].data.terrorism.foreign_based}</p>
        </div>:null}

          {WorldFacts.countries[this.props.country.name.toLowerCase()].data.transnational_issues?
          <div>
          <h3>transnational issues</h3>
          <p><strong>Disputes:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.transnational_issues.disputes}</p>
          {WorldFacts.countries[this.props.country.name.toLowerCase()].data.transnational_issues.illicit_drugs?
          <p><strong>Illicit Drugs:</strong> {WorldFacts.countries[this.props.country.name.toLowerCase()].data.transnational_issues.illicit_drugs.note}</p>
          :null}
        </div>:null}
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
    fetchingArticles:(country)=>{dispatch(fetchingArticles(country))},
    fetchingLocalArticles:(country)=>{dispatch(fetchingLocalArticles(country))}
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Country));
