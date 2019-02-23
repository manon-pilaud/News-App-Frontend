import React from 'react'
import ReactMapboxGl, {GeoJSONLayer} from "react-mapbox-gl";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

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
  if (Array.isArray(countries) && Array.isArray(features)){
    let countriesList = countries
    console.log(countriesList)
    let name = features[0].properties.sovereignt
    console.log(name)
    let foundCountry = countriesList.find(country=>name.includes(country.name))
      if(foundCountry){
        //Not working why
        console.log(foundCountry)
        this.props.history.push(`/country/${foundCountry.id}`)
      }
      else{
        console.log("attempting to create",name)
      }
  }

}

class WorldMap extends React.Component{
  render(){
    return(
      <div>

        <Map
          containerStyle={{ width: '100vw', height: '100vh'}}
          onClick={onClickMap}
          container={'map'}
          style={'mapbox://styles/mandyyp/cjsdtzumk1jih1gr1th20nafp'}
          center={[11.883267, 41.865919]}
          zoom={[1.15]}
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



export default withRouter(connect(mapStateToProps)(WorldMap));
