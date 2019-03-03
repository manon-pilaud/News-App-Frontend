import React, { Component } from 'react';
import {Route, Switch ,Redirect} from "react-router";
import '../App.css';
import WorldMap from './Map'
import Country from './Country'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchingCountries,currentUser,fetchingSavedArticles} from '../redux/actionCreator'
import Navbar from './Navbar'
import Login from './Login'
import Profile from './Profile'
import UserCountries from './MyCountries'
import ReadingList from './ReadingList'
import SignUp from './SignUp'


class App extends Component {
   componentDidMount(){
     if(localStorage.token){
       this.props.currentUser()
      }
      this.props.fetchingCountries()
      this.props.fetchingSavedArticles()
   }

  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/map" component={WorldMap} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/feed' component={Profile}/>
            <Route exact path="/my-countries" render={() => (
              !localStorage.token ? (
                <Redirect to="/signup"/>
              ) : (
                <UserCountries/>
              )
          )}/>
          <Route exact path="/reading-list" render={() => (
            !localStorage.token ? (
              <Redirect to="/signup"/>
            ) : (
              <ReadingList/>
            )
          )}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path="/country/:id" component={Country}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fetchingCountries: ()=>{dispatch(fetchingCountries())},
    currentUser: ()=>{dispatch(currentUser())},
    fetchingSavedArticles: ()=>{dispatch(fetchingSavedArticles())}
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
