import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

class Country extends Component {
  render() {
    console.log(this.props.country)
    return !this.props.country?null:(
        <div>
          {this.props.country.name}
        </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
    let countryId = parseInt(ownProps.match.params.id)
  return{
    country: state.countries.find(country=>
      country.id === countryId
    )
  }
}


export default withRouter(connect(mapStateToProps)(Country));
