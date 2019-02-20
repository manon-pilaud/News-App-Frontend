import React, { Component } from 'react';
import {Route, Switch } from "react-router";
import '../App.css';
import WorldMap from './Map'
import ArticleContainer from './ArticleContainer'
import CategoryContainer from './CategoryContainer'
import {connect} from 'react-redux'
import {fetchingArticles} from '../redux/actionCreator'

class App extends Component {
   componentDidMount(){
     this.props.fetchingArticles()
   }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/map" component={WorldMap} />
          <Route exact path="/articles" component={ArticleContainer} />
          <Route exact path="/categories" component={CategoryContainer} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    fetchingArticles:()=>{dispatch(fetchingArticles())}
  }
}

export default (connect(null, mapDispatchToProps)(App));
