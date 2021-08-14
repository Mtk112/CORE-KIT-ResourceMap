import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';

class DistrictsOverlay extends Component {
    constructor(){
        super();
        this.state = {
          districts: null,
          districtsRef: null
        }  
    }

    onEachFeature(feature, layer) {
        layer.on({
          'click': function (e) {
            console.log('DistrictID: ', e.target.feature.properties.gid + ', District name: ', e.target.feature.properties.name_2 + ' / ', e.target.feature.properties.varname_2 );  
           }
        })
    }

    async getDistricts(){
        const res = await axios.get('http://localhost:5000/districts');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({districts: data[0], districtsRef: reference});
        //console.log(this.state.districts);
    }
    componentDidMount() {
        this.getDistricts();
    }

    render(){
        return(
            this.state.districts && (
                <GeoJSON data={this.state.districts} ref={this.districtsRef} onEachFeature={this.onEachFeature.bind(this)} />
            )
        );
    };
}

export default DistrictsOverlay;