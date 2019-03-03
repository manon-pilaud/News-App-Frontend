import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
class CountryCard extends React.Component{
  unfollowCountry=()=>{
    let targetCountry = this.props.followedCountries.find(followedCountry=>followedCountry.country_id === this.props.country.id)
    fetch(`http://localhost:3000/api/v1/user_countries/${targetCountry.id}`,{
     method: "DELETE"})
    .then(response=>response.json())
    .then(data=>console.log(data))
  }

  followCountry=()=>{
  this.props.followThisCountry(this.props.country)
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
 // .then(data=>this.props.followThisCountry(data))
  }

  render(){
    let followed = this.props.user.countries.includes(this.props.country)
    let followed_two = !!this.props.country.users && !!this.props.country.users.find(user=>user.id === this.props.user.user_id)
    return this.props.country.name === "World News"?null:(
      <div>

      <Card className="country-card">
      <Card.Content>
        <Image floated='right' size='mini' src={`https://www.countryflags.io/${this.props.country.flag}/shiny/64.png`} />
        <Card.Header>{this.props.country.name}</Card.Header>
        <Card.Meta>Some Country Info</Card.Meta>
        <Link to={`country/${this.props.country.id}`}>
        <Card.Description>
          Explore {this.props.country.name}
        </Card.Description>
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
    followThisCountry:(country)=>{dispatch({type:"FOLLOW_COUNTRY",country})}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(CountryCard));
