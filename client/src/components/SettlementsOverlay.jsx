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
        }  
    }
    // Sets the color of settlements based on their population
    pointToLayer(feature, latlng) {
        var pop = feature.properties.population;
        //population 0 - 99
        if(pop < 100){
            return L.circle(latlng, {radius: 5, color: '#fcbba1'});
        }
        //population 100 - 999
        if(pop >= 100 &&  pop < 1000){
            return L.circle(latlng, {radius: 5, color: '#fb6a4a'});
        }
        //population 1000 - 9999
        if(pop >= 1000 && pop < 10000){
            return L.circle(latlng, {radius: 5, color: '#de2d26'});
        }
        //population 10000 or higher
        if(pop >= 10000){
            return L.circle(latlng, {radius: 5, color: '#a50f15'});
        }
        if(feature.properties.gid === this.props.settlement.gid){
            console.log("Matched latlng");
            return L.circle(latlng, {radius: 5, color: '#800080'});
        }
    }

    onEachFeature(feature, layer) {
        //this.bindTooltip(feature.properties.name);
        layer.bindPopup("Settlement: " + feature.properties.name + "</br> Population: " + feature.properties.population);
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
    // Gets all settlements
    async getSettlements(){
        const res = await axios.get('http://localhost:5000/settlements');
        const { data } = res;
        let reference = React.createRef();
        this.setState({settlements: data, settlementRef: reference});
    }

    componentDidMount() {
        this.getSettlements();
    }

    render(){
        return(
            this.state.settlements &&(
                <>
                    <GeoJSON data={this.state.settlements} ref={this.settlementRef} pointToLayer={this.pointToLayer.bind(this)} onEachFeature={this.onEachFeature} />
                </>
            )
        )
    }
}


export default SettlementsOverlay;