import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';

//might change this to a functional component for consistancy.
class MediumVoltageGrid extends Component{

    constructor(){
        super();
        this.state = {
          mvGrid: null,
          mvGridRef: null
        } 
    }
    // gets the medium_voltage_grid data from PostgreSQL.
    async getGrid(){
        const res = await axios.get('http://localhost:5000/grid');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({mvGrid: data[0], mvGridRef: reference});
    };

    onEachFeature(feature, layer) {
        //this.bindTooltip(feature.properties.name);
        layer.bindPopup("Grid ID: " + feature.properties.gid +  "</br> From: " + feature.properties.ex_from + "</br> To: " +feature.properties.ex_to);
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
        this.getGrid();
    };

    render(){
        //changing the color of the feature on layer
        const style = {
            color: 'orange',
            fillColor: 'orange'
        };
        return(
            this.state.mvGrid && (
                <GeoJSON data={this.state.mvGrid} ref={this.mvGridRef} style={style} onEachFeature={this.onEachFeature}/>
            )
        );
    };
};
export default MediumVoltageGrid;