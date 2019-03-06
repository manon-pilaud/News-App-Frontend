import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
import { clearSearch } from '../redux/actionCreator'
import SearchBar from './CountrySearchBar'
import CountryCard from './CountryCard'
import { Button, Divider, Grid, Header, Icon, Search, Segment } from 'semantic-ui-react'
class MyCountries extends React.Component{

  componentWillUnmount(){
    this.props.clearSearch()
  }

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
      <SearchBar/>
      {!this.props.userCountries?null:
        <Card.Group className="my-countries">
        {this.props.userCountries.filter(
          c =>
            c.name.toLowerCase().includes(this.props.searchText.toLowerCase())
        ).map(country=><CountryCard key={country.id} country={country}/>)}
      </Card.Group>}
    </div>:
    <div className="country-cards">
    <button onClick={this.showAll}>Display My Countries</button>
      <SearchBar/>
      {!this.props.countries?null:
         <Card.Group className="my-countries">
        {this.props.countries.filter(
          c =>
            c.name.toLowerCase().includes(this.props.searchText.toLowerCase())
        ).map(country=><CountryCard key={country.id} country={country}/>)}
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
    countries: state.countries,
    searchText: state.filters
  }
}

const mapDispatchToProps=dispatch=>{
  return{
      clearSearch: () => {dispatch(clearSearch())}
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(MyCountries));
