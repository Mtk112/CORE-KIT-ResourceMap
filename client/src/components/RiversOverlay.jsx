import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

class RiversOverlay extends Component {
    constructor(){
        super();
        this.state = {
          rivers: null,
          riversRef: null
        }  
    }

    onEachFeature(feature, layer) {
        layer.on({
          'click': function (e) {
            console.log('RiverID: ', e.target.feature.properties.gid );  
           }
        })
    }

    async getRivers(){
        const res = await axios.get('http://localhost:5000/settlements');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({rivers: data[0], riversRef: reference});
        console.log(this.state.rivers);
    }
    componentDidMount() {
        this.getRivers();
    }

    render(){
        return(
            this.state.rivers && (
                <GeoJSON data={this.state.rivers} ref={this.riversRef} onEachFeature={this.onEachFeature.bind(this)} />
            )
        )
    }
}

export default RiversOverlay;