import React from 'react'
import Region from './Region'
import Country from './Country'
import ReactMapboxGl, { Layer,Feature,GeoJSONLayer,Source} from "react-mapbox-gl";


const MapKey = process.env.REACT_APP_MAP_API_KEY;
const Map = ReactMapboxGl({
  accessToken: MapKey
});

const linePaint: MapboxGL.LinePaint = {
  'line-color': 'white',
  'line-width': 0.5
};

const fillPaint: MapboxGL.FillPaint={
    'fill-color': 'rgba(246,245,245,0)'
}




const onClickMap=(features)=> {
  if(Array.isArray(features)){
    let feature = features[0].properties.sovereignt
    console.log(feature)
  }
}

export default class WorldMap extends React.Component{

  render(){
    return(
      <Map
        style="mapbox://styles/mandyyp/cjsdtzumk1jih1gr1th20nafp"
        containerStyle={{ width: '100vw', height: '100vh'}}
        center={[0,0]}
        zoom={[0]}
        onClick={onClickMap}
        >
        <GeoJSONLayer
          data={'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'}
          id='country-layer'
          fillPaint={fillPaint}
          linePaint={linePaint}
          fillOnClick={
            (e)=>{
              onClickMap(e.features)}}
          >
        </GeoJSONLayer>
        </Map>

    )
  }
}
