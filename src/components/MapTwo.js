import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
    process.env.REACT_APP_MAP_API_KEY;

class Map extends Component {
  state = {
    viewport: {
      width: 100,
      height: 100,
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
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
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
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10
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
              lineColor:  [255, 0, 0],
              lineWidthMinPixels: 2,
              wireframe: true,
              getLineColor: f => [255, 0, 0],
              getFillColor: f => [255, 0, 0, 0],
              pickable: true,
              onHover: info => console.log('Hovered:', info),
              onClick: info => console.log('Clicked:', info)
            })
          ]}/>
      </MapGL>
    );
  }
}

export default Map
