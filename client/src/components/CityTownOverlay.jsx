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

    onEachFeature(feature, layer) {
        layer.on({
          'click': function (e) {
            console.log('City / town ID: ', e.target.feature.properties.gid + ', city / town name: ', e.target.feature.properties.city__town);  
           }
        });
    };
    // gets City_Town data from PostgreSQL
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
                <GeoJSON data={this.state.cityTown} ref={this.cityTownRef} onEachFeature={this.onEachFeature.bind(this)} pointToLayer={this.pointToLayer.bind(this)} />
            )
        );
    };
};

export default CityTownOverlay;