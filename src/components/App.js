import React, { Component } from 'react';
import {Route, Switch ,Redirect} from "react-router";
import '../App.css';
import MapTwo from './MapTwo'
import Country from './Country'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchingCountries,currentUser,fetchingSavedArticles} from '../redux/actionCreator'
import NavbarTwo from './NavbarTwo'
import Login from './Login'
import Profile from './Profile'
import UserCountries from './MyCountries'
import ReadingList from './ReadingList'
import SignUp from './SignUp'
//TO DO
  //REDUX NEWS CARD AND COUNTRY FOLLOW UNFOLLOW COMPS
  //REFACTOR SOME CLASS COMP TO FUNCTIONAL
  //ADD RELIGION TO COUNTRY INFO
  //PULL COUNTY INTO INTO NEW COMP
  //PULL ACTIONS INTO FOLDER AND SEPERATE CONCERNS
  //COMP VS. CONT FOLDERS
  //CALLS FROM BACK END
//----------------------------------------------------------------------------------------------------

  // <iframe width="1920" scrolling="no" height="20" frameborder="0" src="https://widgets.tc2000.com/WidgetServer.ashx?id=134382"></iframe>
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
        <NavbarTwo/>
        <Switch>
          <Route exact path="/map" component={MapTwo} />
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
        <Route exact path="/signup" render={() => (
            localStorage.token ? (
              <Redirect to="/feed"/>
            ) : (
              <SignUp/>
            )
          )}/>

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
