import React from 'react'
import {connect} from 'react-redux'
import CountryCard from './CountryCard'
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
    console.log(this.props.countries)
    return(
    <div>
      {!this.state.showAll?
      <div className="my-countries">
      <button onClick={this.showAll}>Display all Countries</button>
      {!this.props.userCountries?null:<div>
        {this.props.userCountries.map(country=><CountryCard key={country.id} country={country}/>)}
      </div>}
    </div>:
    <div>
    <button onClick={this.showAll}>Display My Countries</button>
      {!this.props.countries?null:<div>
        {this.props.countries.map(country=><CountryCard key={country.id} country={country}/>)}
      </div>}
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
