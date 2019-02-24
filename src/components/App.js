import React, { Component } from 'react';
import {Route, Switch } from "react-router";
import '../App.css';
import WorldMap from './Map'
import Country from './Country'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchingCountries} from '../redux/actionCreator'
import Navbar from './Navbar'

class App extends Component {
   componentDidMount(){
     this.props.fetchingCountries()
   }
  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route
             path="/country/:id"
             component={Country}
           />
          <Route exact path="/map" component={WorldMap} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fetchingCountries:()=>{dispatch(fetchingCountries())}
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
