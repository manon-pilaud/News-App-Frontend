import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
import CountryCard from './CountryCard'
import { Button, Divider, Grid, Header, Icon, Search, Segment } from 'semantic-ui-react'
class MyCountries extends React.Component{
  state={
    showAll: false
  }

  showAll=()=>{
    this.setState({
      showAll: !this.state.showAll
    })
  }



  render(){
    return(
    <div>
      {!this.state.showAll?
      <div>
      <button onClick={this.showAll}>Display all Countries</button>
        <Grid.Column>

        <Search placeholder='Search countries...' />
      </Grid.Column>

      {!this.props.userCountries?null:
        <Card.Group className="my-countries">
        {this.props.userCountries.map(country=><CountryCard key={country.id} country={country}/>)}
      </Card.Group>}
    </div>:
    <div className="country-cards">
    <button onClick={this.showAll}>Display My Countries</button>
      <Grid.Column>
      <Search placeholder='Search countries...' />
    </Grid.Column>
      {!this.props.countries?null:
         <Card.Group className="my-countries">
        {this.props.countries.map(country=><CountryCard key={country.id} country={country}/>)}
      </Card.Group>
    }
    </div>
  }
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    userCountries: state.currentUser.countries,
    countries: state.countries
  }
}

export default (connect(mapStateToProps)(MyCountries));
