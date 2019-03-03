import React, { Component } from 'react';
import {Route, Switch } from "react-router";
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
          <Route path="/country/:id" component={Country}/>
          <Route exact path="/map" component={WorldMap} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/feed' component={Profile}/>
          <Route exact path='/my-countries' component={UserCountries}/>
          <Route exact path='/reading-list' component={ReadingList}/>
          <Route exact path='/signup' component={SignUp}/>
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
