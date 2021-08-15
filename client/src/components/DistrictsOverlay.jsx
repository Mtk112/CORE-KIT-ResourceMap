import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON, Pane } from 'react-leaflet';

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
        //changing the color of the layer
        const style = {
            color: 'DarkOliveGreen',
            fillColor: 'DarkOliveGreen'
        };
        return(
            this.state.districts && (
                <Pane className="districtsPane" id="pane">
                    <GeoJSON data={this.state.districts} ref={this.districtsRef} onEachFeature={this.onEachFeature.bind(this)} style={style} />
                </Pane>
            )
        );
    };
}

export default DistrictsOverlay;