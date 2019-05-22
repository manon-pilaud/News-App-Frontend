import React from 'react'
import {connect} from 'react-redux'
import { Button, Card, Image,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {followingCountry,unfollowingCountry} from '../redux/action/UserCountryActions'
class CountryCard extends React.Component{

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
          <Button basic color='red' onClick={()=>this.props.unfollowCountry(this.props.country)}>
            Unfollow
          </Button>:
            <Button  onClick={()=>this.props.followCountry(this.props.country,this.props.user)} basic color='green'>
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
    followCountry:(country,user)=>{dispatch(followingCountry(country,user))},
    unfollowCountry:(country)=>{dispatch(unfollowingCountry(country))}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(CountryCard));
