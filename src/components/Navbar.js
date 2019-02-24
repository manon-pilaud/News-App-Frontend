import React from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends React.Component{
  render(){
    return(
      <div>
    <div className="nav">
    <div className="nav-header">
      <div className="nav-title">
        ExploreNews
      </div>
    </div>
    <div className="nav-btn">
      <label htmlFor="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    <input type="checkbox" id="nav-check"/>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/map">Map</Link>
      <a target="_blank">Something</a>
      <a target="_blank">SomethingElse</a>
    </div>
  </div>
    </div>
    )
  }
}
