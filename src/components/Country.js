import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {fetchingArticles} from '../redux/actionCreator'
class Country extends Component {
  componentDidMount(){
    this.props.fetchingArticles()
  }
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
      country.id === countryId)
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    fetchingArticles:()=>{dispatch(fetchingArticles())}
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Country));
