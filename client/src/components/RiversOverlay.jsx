import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';

//might change this to functional component for consistancy.
class RiversOverlay extends Component {
    constructor(){
        super();
        this.state = {
          rivers: null,
          riversRef: null
        }  
    }

    //gets the river data from PostgreSQL/PostGIS.
    async getRivers(){
        const res = await axios.get('http://localhost:5000/rivers');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({rivers: data[0], riversRef: reference});
        //console.log(this.state.rivers);
    }

    onEachFeature(feature, layer) {
        //this.bindTooltip(feature.properties.name);
        layer.bindPopup("River ID: " + feature.properties.riverid);
        layer.on({
            'mouseover': function (e) {
                layer.openPopup();
        }
        });
        layer.on({
            'mouseout': function (e){
                layer.closePopup();
            }
        });
    }
    
    componentDidMount() {
        this.getRivers();
    };

    render(){
        const style = {
            color: 'lightseagreen',
            fillColor: 'lightseagreen'
        };
        return(
            this.state.rivers && (
                <GeoJSON data={this.state.rivers} ref={this.riversRef} style={style} onEachFeature={this.onEachFeature} />
            )
        );
    };
};

export default RiversOverlay;