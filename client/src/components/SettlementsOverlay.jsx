import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON} from 'react-leaflet';
import L from 'leaflet';

class SettlementsOverlay  extends Component {
    constructor(){
        super();
        this.state = {
          settlements: null,
          settlementRef: null,
          lastSettlement: null,
        }  
    }

    pointToLayer(feature, latlng) {
        var pop = feature.properties.population;
        if(pop < 100){
            return L.circle(latlng, {radius: 5, color: '#fcbba1'});
        }
        if(pop >= 100 &&  pop < 1000){
            return L.circle(latlng, {radius: 5, color: '#fb6a4a'});
        }
        if(pop >= 1000 && pop < 10000){
            return L.circle(latlng, {radius: 5, color: '#de2d26'});
        }
        if(pop >= 10000){
            return L.circle(latlng, {radius: 5, color: '#a50f15'});
        }
    }

    onEachFeature(feature, layer) {
        layer.on({
        'click': function (e) {
            //this.setState({lastSettlement: e.target});
            //console.log('Name: ', e.target.feature.properties.name + ', population: ', e.target.feature.properties.population + ', number of households: ', e.target.feature.properties.village_hh + ', settlement ID: ', e.target.feature.properties.gid );  
        }
        })
    }
    // Gets all settlements
    async getSettlements(){
        const res = await axios.get('http://localhost:5000/settlements');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({settlements: data[0], settlementRef: reference});
        //console.log(this.state.settlements);
    }

    componentDidMount() {
        this.getSettlements();
    }

    render(){
        return(
            this.state.settlements &&(
                <>
                    <GeoJSON data={this.state.settlements} ref={this.settlementRef} onEachFeature={this.onEachFeature.bind(this)} pointToLayer={this.pointToLayer.bind(this)} />
                </>
            )
        )
    }
}


export default SettlementsOverlay;