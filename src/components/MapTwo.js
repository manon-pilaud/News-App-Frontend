import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import {connect} from 'react-redux';

const MAPBOX_TOKEN =
    process.env.REACT_APP_MAP_API_KEY;

class Map extends Component {

  onClickMap=(countryName,countriesList)=> {
    let foundCountry = countriesList.find(country=>countryName.includes(country.name))
    if(countryName==="Papua New Guinea"){
      this.props.history.push("country/109")
    }
    else if(countryName==="Guinea Bissau"){
      this.props.history.push("country/148")
    }
    else if(countryName==="Equatorial Guinea"){
      this.props.history.push("country/152")
    }
    else{
      this.props.history.push(`/country/${foundCountry.id}`)
    }
  }
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude:41.865919,
      longitude: -11.883267,
      zoom: 1
    },
    searchResultLayer: null
  };

  mapRef = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.handleViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  handleViewportChange = viewport => {
    if (viewport.longitude > 0) {
      viewport.longitude = 0;
    }
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry
      })
    });
  };

  render() {
    const { viewport, searchResultLayer } = this.state;

    return (
      <MapGL
        ref={this.mapRef}
        {...viewport}
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        <DeckGL {...viewport} layers={[searchResultLayer]} />
        <DeckGL  {...this.state.viewport} layers={[
            new GeoJsonLayer({
              id: 'geojson-layer',
              data:'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson',
              lineWidthScale: 4,
              opacity: 0.4,
              filled: true,
              stroked: true,
              lineWidth: 2,
              lineColor:  [246, 245, 245,0],
              lineWidthMinPixels: 2,
              wireframe: true,
              getLineColor: f => [246, 245, 245,0],
              getFillColor: f => [255, 0, 0, 0],
              pickable: true,
              onClick: info => this.onClickMap(info.object.properties.sovereignt,this.props.countries)
            })
          ]}/>
      </MapGL>
    );
  }
}
    // onHover: info => console.log('Hovered:', info),

  const mapStateToProps = (state) => {
    return{
      countries: state.countries
    }
  }



export default (connect(mapStateToProps)(Map));
