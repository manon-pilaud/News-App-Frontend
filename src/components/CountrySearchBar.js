import React from "react";
import {connect} from 'react-redux'
import {searching} from '../redux/actionCreator'
import {Search} from 'semantic-ui-react'

const Searchbar = props => {
  return (
    <div>
        <Search placeholder='Search...' value={props.value} onSearchChange={(e)=>props.onChange(e.target.value)} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    value: state.searchText
  }
}

export default connect(mapStateToProps, {onChange: searching})(Searchbar);
