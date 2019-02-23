import React from 'react'
import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";
import {connect} from 'react-redux'

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

const onClickMap=(features,countries)=> {
  if (Array.isArray(countries)){
    let countriesList = countries
    console.log(countriesList)
  }
  if(Array.isArray(features)){
    let name = features[0].properties.sovereignt
    console.log(name)
  }
}

class WorldMap extends React.Component{
  render(){
    return(
      <div>
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
                onClickMap(e.features, this.props.countries)}}
            >
          </GeoJSONLayer>
          </Map>
        </div>

    )
  }
}

const mapStateToProps = (state) => {
  return{
    countries: state.countries
  }
}


export default(connect(mapStateToProps)(WorldMap));
