import React from 'react'
import Region from './Region'
import Country from './Country'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const MapKey = process.env.REACT_APP_MAP_API_KEY;
const Map = ReactMapboxGl({
  accessToken: MapKey
});
export default class WorldMap extends React.Component{
  render(){
    return(
      <div>
      <Map
        style="mapbox://styles/mandyyp/cjsdtzumk1jih1gr1th20nafp"
        containerStyle={{ width: '100vw', height: '100vh'}}
        />
      </div>
    )
  }
}
