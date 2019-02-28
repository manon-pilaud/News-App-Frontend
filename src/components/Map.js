import React from 'react'
import ReactMapboxGl, {GeoJSONLayer,Feature,Layer} from "react-mapbox-gl";
import {connect} from 'react-redux'
import Geocoder from 'react-mapbox-gl-geocoder'
// import {withRouter} from 'react-router-dom';
// import {Link} from 'react-router-dom'

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


class WorldMap extends React.Component{
  state={
    mapToggle: false
  }
  worldToggled=()=>{
    this.setState({
      mapToggle: !this.state.mapToggle
    })
  }
  onClickMap=(features,countries)=> {
    if (Array.isArray(countries) && Array.isArray(features)){
      let countriesList = countries
      let name = features[0].properties.sovereignt
      let foundCountry = countriesList.find(country=>name.includes(country.name))
      if(foundCountry){
        this.props.history.push(`/country/${foundCountry.id}`)
      }
    }

  }
  render(){
    return(
      <div>
        {!this.state.mapToggle?
        <Map
          containerStyle={{ width: '100vw', height: '100vh'}}
          onClick={this.onClickMap}
          container={'map'}
          style={'mapbox://styles/mandyyp/cjsnp8ymx661o1fpl9r9l7puq'}
          center={[11.883267, 41.865919]}
          zoom={[1.00]}
          >
          <GeoJSONLayer
            data={'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'}
            id='country-layer'
            fillPaint={fillPaint}
            linePaint={linePaint}
            fillOnClick={
              (e)=>{
                this.onClickMap(e.features, this.props.countries)}}
            >
          </GeoJSONLayer>
          <Layer type="circle" id="marker" paint={{
             'circle-color': "white",
             'circle-stroke-width': 2.5,
             'circle-stroke-color': 'white',
             'circle-stroke-opacity': 1
          }}>
            <Feature onClick={this.worldToggled} coordinates={[-2.122169,81.740307]}/>
        </Layer>
          </Map>:
          <Map
            containerStyle={{ width: '100vw', height: '100vh'}}
            onClick={this.onClickMap}
            container={'map'}
            style={'mapbox://styles/mandyyp/cjsmbr4cm0nue1fnue0hvno8i'}
            center={[11.883267, 41.865919]}
            zoom={[1.00]}
            >
            <GeoJSONLayer
              data={'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'}
              id='country-layer'
              fillPaint={fillPaint}
              linePaint={linePaint}
              fillOnClick={
                (e)=>{
                  this.onClickMap(e.features, this.props.countries)}}
              >
            </GeoJSONLayer>
              <Layer type="circle" id="marker" paint={{
                 'circle-color': "white",
                 'circle-stroke-width': 2.5,
                 'circle-stroke-color': 'white',
                 'circle-stroke-opacity': 1
              }}>
                <Feature onClick={this.worldToggled} coordinates={[-2.122169,81.740307]}/>
            </Layer>
            </Map>
          }
        </div>

    )
  }
}

const mapStateToProps = (state) => {
  return{
    countries: state.countries
  }
}



export default (connect(mapStateToProps)(WorldMap));
