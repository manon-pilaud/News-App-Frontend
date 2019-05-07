import React from 'react'
import {Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
class Navbar extends React.Component{
  render(){
    return(
      <div>
    <div className="nav">
    <div className="nav-header">
      <div className="nav-title">
        <Icon name="world"/>StayCurrent
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
      <Link to="/feed">Top Stories</Link>
      <Link to="/map">Map</Link>
      <Link to="/reading-list">Reading List</Link>
      <Link to="/my-countries">My Countries</Link>
      {this.props.currentUser?
        <Link to="/login">Sign Out</Link>
      :
        <Link to="/login">Sign In</Link>
      }
    </div>
  </div>
    </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    currentUser: state.currentUser
  }
}

export default (connect(mapStateToProps)(Navbar));
