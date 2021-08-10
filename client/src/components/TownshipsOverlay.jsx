import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

class TownshipsOverlay extends Component{
    constructor(){
        super();
        this.state = {
          townships: null,
          townshipsRef: null
        };
    };
    onEachFeature(feature, layer) {
        layer.on({
          'click': function (e) {
            console.log('TownshipID: ', e.target.feature.properties.gid + ', Township name: ',  e.target.feature.properties.name_3);  
           }
        });
    };

    async getTownships(){
        const res = await axios.get('http://localhost:5000/townships');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({townships: data[0], townshipsRef: reference});
        console.log(this.state.townships);
    };
    componentDidMount() {
        this.getTownships();
    };

    render(){
        return(
            this.state.townships && (
                <GeoJSON attribution="Township data from 2014 Census, Myanmar" data={this.state.townships} ref={this.townshipsRef} onEachFeature={this.onEachFeature.bind(this)} />
            )
        )
    };
    
}

export default TownshipsOverlay;