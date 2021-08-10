import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

class MediumVoltageGrid extends Component{

    constructor(){
        super();
        this.state = {
          mvGrid: null,
          mvGridRef: null
        } 
    }
    onEachFeature(feature, layer) {
        layer.on({
          'click': function (e) {
            console.log('GridID: ', e.target.feature.properties.gid + ', from ', e.target.feature.properties.ex_from + ', to ', e.target.feature.properties.ex_to);  
           }
        });
    };

    async getGrid(){
        const res = await axios.get('http://localhost:5000/grid');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({mvGrid: data[0], mvGridRef: reference});
        console.log(this.state.mvGrid);
    };
    componentDidMount() {
        this.getGrid();
    };

    render(){
        return(
            this.state.mvGrid && (
                <GeoJSON data={this.state.mvGrid} ref={this.mvGridRef} onEachFeature={this.onEachFeature.bind(this)} />
            )
        )
    };
}
export default MediumVoltageGrid;