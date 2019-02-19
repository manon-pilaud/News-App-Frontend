import React from 'react'
import Region from './Region'
import Country from './Country'
export default class Map extends React.Component{
  render(){
    return(
      <div>
      <div>I am a map</div>
      <Region/>
      <Country/>
      </div>
    )
  }
}
