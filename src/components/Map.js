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

const onClickMap=(map,evt)=> {
  const features = map.queryRenderedFeatures(evt.point, { GeoJSONLayer: ['country-layer'] })
  let countryName = features[0].properties.name_en
  console.log(countryName)
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
          linePaint={linePaint}
        />
        </Map>

    )
  }
}
