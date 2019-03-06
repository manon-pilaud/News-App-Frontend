import { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class Geocoder extends Component {
  static contextTypes = { map: PropTypes.object.isRequired }
  componentDidMount() {

    const { map } = this.context;


    map.addControl(
      new MapboxGeocoder({
        accessToken: process.env.REACT_APP_MAP_API_KEY
      })
    );
  }

  render() {
    return null;
  }
}

export default Geocoder;
