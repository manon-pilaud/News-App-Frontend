import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'
class CountryCard extends React.Component{

  unfollowCountry=()=>{
    let targetCountry = this.props.followedCountries.find(followedCountry=>followedCountry.country_id === this.props.country.id)
    fetch(`http://localhost:3000/api/v1/user_countries/${targetCountry.id}`,{
     method: "DELETE"})
    .then(response=>response.json())
    .then(data=>console.log(data))
    //setState not working need to reflect on front end
  }

  render(){
    return(
      <div>
    <Card.Group>
      <Card>
      <Card.Content>
        <Image floated='right' size='mini' src={`https://www.countryflags.io/${this.props.country.flag}/shiny/64.png`} />
        <Card.Header>{this.props.country.name}</Card.Header>
        <Card.Meta>Some Country Info</Card.Meta>
        <Card.Description>
          Some Description
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red' onClick={this.unfollowCountry}>
            unfollow
          </Button>
        </div>
      </Card.Content>
    </Card>
    </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    followedCountries: state.currentUser.user_countries
  }
}

export default (connect(mapStateToProps)(CountryCard));
