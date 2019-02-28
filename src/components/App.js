import React, { Component } from 'react';
import {Route, Switch } from "react-router";
import '../App.css';
import WorldMap from './Map'
import Country from './Country'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchingCountries,currentUser} from '../redux/actionCreator'
import Navbar from './Navbar'
import Login from './Login'

class App extends Component {
   componentDidMount(){
      this.props.currentUser()
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
          <Route exact path='/login' component={Login}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fetchingCountries: ()=>{dispatch(fetchingCountries())},
    currentUser: ()=>{dispatch(currentUser())}
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
