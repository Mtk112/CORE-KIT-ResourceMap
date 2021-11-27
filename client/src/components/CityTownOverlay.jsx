import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

// might change this to functional component for consistancy
class CityTownOverlay extends Component {
    constructor(){
        super();
        this.state = {
          cityTown: null,
          cityTownRef: null
        }  
    }
    // Changes the style of showing each feature from marker to a circle.
    pointToLayer(feature, latlng) {
        return L.circle(latlng, {radius: 5, color: 'red'});
    }

    // gets City_Town data from PostgreSQL/PostGIS
    async getCityTown(){
        const res = await axios.get('http://localhost:5000/city_town');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({cityTown: data[0], cityTownRef: reference});
    };
    componentDidMount() {
        this.getCityTown();
    };

    render(){
        return(
            this.state.cityTown && (
                <GeoJSON data={this.state.cityTown} ref={this.cityTownRef} pointToLayer={this.pointToLayer.bind(this)} />
            )
        );
    };
};

export default CityTownOverlay;