import React, { Component } from 'react';
import {Route, Switch } from "react-router";
import '../App.css';
import WorldMap from './Map'
import Country from './Country'
import ArticleContainer from './ArticleContainer'
import {connect} from 'react-redux'
import {fetchingCountries} from '../redux/actionCreator'

class App extends Component {
   componentDidMount(){
     this.props.fetchingCountries()
   }
  render() {
    return (
      <div>
        <Switch>
          <Route
             path="/country/:id"
             component={Country}
           />
          <Route exact path="/map" component={WorldMap} />
          <Route exact path="/articles" component={ArticleContainer}/>
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

export default (connect(null, mapDispatchToProps)(App));
