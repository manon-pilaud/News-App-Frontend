import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
class CountryCard extends React.Component{
//REDUX FIX
  unfollowCountry=()=>{
    let targetCountry = this.props.followedCountries.find(followedCountry=>followedCountry.country_id === this.props.country.id)
    fetch(`http://localhost:3000/api/v1/user_countries/${targetCountry.id}`,{
     method: "DELETE"})
    .then(response=>response.json())
    .then(joinInfo=>this.props.removeRelationship(joinInfo))
    .then(this.props.unfollowThisCountry(this.props.country))

    //Need to remove from user_countries join table as well
  }

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
 .then(data=>this.props.followThisCountry(this.props.country))
  }

  render(){
    //Fix logic here sometimes doesn't show up
    let followed = this.props.user.countries.includes(this.props.country)
    let followed_two = !!this.props.country.users && !!this.props.country.users.find(user=>user.id === this.props.user.user_id)
    return this.props.country.name === "World News"?null:(
      <div>

      <Card id="country-card">
      <Card.Content>
        <Image floated='right' size='mini' src={`https://www.countryflags.io/${this.props.country.flag}/shiny/64.png`} />
        <Card.Header>{this.props.country.name}</Card.Header>
        <Link to={`country/${this.props.country.id}`}>
        <div id="explore-country"><Card.Meta >
          Explore {this.props.country.name}
          <Icon name="plane" id="plane-icon"/>
        </Card.Meta></div>
        </Link>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        {followed_two || followed?
          <Button basic color='red' onClick={this.unfollowCountry}>
            Unfollow
          </Button>:
            <Button  onClick={this.followCountry} basic color='green'>
              Follow
            </Button>}
        </div>
      </Card.Content>
    </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    followedCountries: state.currentUser.user_countries,
    user: state.currentUser
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    followThisCountry:(country)=>{dispatch({type:"FOLLOW_COUNTRY",country})},
    updateUserCountries:(data)=>{dispatch({type:"UPDATE_USER_COUNTRIES",data})},
    removeRelationship:(joinInfo)=>{dispatch({type:"REMOVE_COUNTRY_RELATIONSHIP",joinInfo})},
    unfollowThisCountry:(country)=>{dispatch({type:"UNFOLLOW_COUNTRY",country})}


  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(CountryCard));
