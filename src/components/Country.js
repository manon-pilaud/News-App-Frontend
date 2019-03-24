import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import{fetchingArticles,fetchingLocalArticles,fetchingGuardianArticles,setCountry} from '../redux/actionCreator'
import ArticlesContainer from './ArticlesContainer'
import WorldFacts from '../factbook.json'
class Country extends PureComponent {
  followCountry=()=>{
  fetch('http://localhost:3000/api/v1/user_countries',{
   method: "POST",
   headers:{
     "Authentication": `Bearer ${localStorage.token}`,
     "Content-Type" : "application/json",
     "Accept" : "application/json"
   },
   body: JSON.stringify({
      user_id: this.props.user.user_id,
      country_id: this.props.country.id
   })
 })
 .then(response=>response.json())
 .then(data=>this.props.updateUserCountries(data))
 .then(data=>this.props.followThisCountry(this.props.country,data))
}

  unfollowCountry=()=>{
  let user_country = this.props.user.user_countries.find(userCountry=>userCountry.country_id === this.props.country.id)
  fetch(`http://localhost:3000/api/v1/user_countries/${user_country.id}`,{
   method: "DELETE"})
  .then(response=>response.json())
  .then(joinInfo=>this.props.removeRelationship(joinInfo))
  .then(this.props.unfollowThisCountry(this.props.country))
  //Need to remove from user_countries join table as well
  }


  render() {
    if(this.props.country){
      this.props.fetchingArticles(this.props.country)
      this.props.fetchingLocalArticles(this.props.country)
      this.props.fetchingGuardianArticles(this.props.country)
      this.props.setCountry(this.props.country)
    }
    return !this.props.country?null:(
        <div>
          <div className="flag-and-header">
            <div id="center-header">
            <center>
              <h1>{this.props.country.name}</h1>
            </center>
            {localStorage.token?
            <div>
            {!!!this.props.user.countries.find(userCountry=>userCountry.name === this.props.country.name)?
            <center><Button size='mini' onClick={this.followCountry} positive>Follow {this.props.country.name}</Button></center>:
            <center><Button size='mini' negative onClick={this.unfollowCountry}>Unfollow {this.props.country.name}</Button></center>}
            </div>
              :null}
            </div>
          </div>
          {WorldFacts.countries[this.props.country.name.toLowerCase()]?
          <div className="country-info">
          <img src={`https://www.countryflags.io/${this.props.country.flag}/shiny/64.png`}/>
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
          <ArticlesContainer/>
        </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
    let countryId = parseInt(ownProps.match.params.id)
  return{
    country: state.countries.find(country=>
      country.id === countryId),
      user: state.currentUser
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    fetchingArticles:(country)=>{dispatch(fetchingArticles(country))},
    fetchingLocalArticles:(country)=>{dispatch(fetchingLocalArticles(country))},
    fetchingGuardianArticles:(country)=>{dispatch(fetchingGuardianArticles(country))},
    setCountry:(country)=>{dispatch(setCountry(country))},
    updateUserCountries:(data)=>{dispatch({type:"UPDATE_USER_COUNTRIES",data})},
    followThisCountry:(country)=>{dispatch({type:"FOLLOW_COUNTRY",country})},
    removeRelationship:(joinInfo)=>{dispatch({type:"REMOVE_COUNTRY_RELATIONSHIP",joinInfo})},
    unfollowThisCountry:(country)=>{dispatch({type:"UNFOLLOW_COUNTRY",country})}
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Country));
