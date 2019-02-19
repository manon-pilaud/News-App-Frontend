import React, { Component } from 'react';
import '../App.css';
import WorldMap from './Map'
import ArticleContainer from './ArticleContainer'
import CategoryContainer from './CategoryContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorldMap/>
        <ArticleContainer/>
        <CategoryContainer/>
      </div>
    );
  }
}

export default App;
