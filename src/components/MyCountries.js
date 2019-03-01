import React from 'react'
import {connect} from 'react-redux'
import CountryCard from './CountryCard'
class MyCountries extends React.Component{
  render(){
    return !this.props.userCountries?null:(
      <div>
        {this.props.userCountries.map(country=><CountryCard key={country.id} country={country}/>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    userCountries: state.currentUser.countries
  }
}

export default (connect(mapStateToProps)(MyCountries));
