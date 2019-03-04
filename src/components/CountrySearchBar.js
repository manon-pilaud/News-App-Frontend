import React from "react";
import {connect} from 'react-redux'
import {searching} from '../redux/actionCreator'

const Searchbar = props => {
  return (
    <div className="ui container">
      <div className="ui very large fluid input">
        <input
          type="text"
          placeholder="Search"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
      <div className="ui clearing section divider" />
    </div>
  )
}
const mapStateToProps = state => {
  return {
    value: state.searchText
  }
}
export default connect(mapStateToProps, {onChange: searching})(Searchbar);
