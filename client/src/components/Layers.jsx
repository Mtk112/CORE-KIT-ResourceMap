import React, { Component } from 'react';
import axios from 'axios';
import { TileLayer, LayersControl, GeoJSON, LayerGroup } from 'react-leaflet';
import L from 'leaflet';



class Layers  extends Component {
    constructor(){
        super();
        this.state = {
          settlements: null,
          settlementRef: null,
          rivers: null,
          lastSettlement: null
        }  
    }

    pointToLayer(feature, latlng) {
        return L.circle(latlng, {radius: 5});
    }

    onEachFeatureSettlement(feature, layer) {
        layer.on({
          'click': function (e) {
            //this.setState({lastSettlement: e.target});
            console.log('Name: ', e.target.feature.properties.name + ', population: ', e.target.feature.properties.population + ', number of households: ', e.target.feature.properties.village_hh + ', settlement ID: ', e.target.feature.properties.gid );  
           }
        })
      }
      

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
  return (
      <LayersControl position="topright">
            <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="MapBox.Streets">
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                    id='mapbox/streets-v11'
                    accessToken='pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="MapBox.Satellite">
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                    id='mapbox/satellite-v9'
                    accessToken='pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer checked name="OpenTopoMap">
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org/">SRTM</a> | map style: © <a href="https://opentopomap.org/">OpenTopoMap</a> (CC-BY-SA)'
                    url='https://a.tile.opentopomap.org/{z}/{x}/{y}.png'
                />
            </LayersControl.BaseLayer>

            { /* Overlays */}

            <LayersControl.Overlay name="Rivers">
                <LayerGroup>
                    
                </LayerGroup>    
            </LayersControl.Overlay>
  
            <LayersControl.Overlay checked name="Settlements">
                    {this.state.settlements && (
                        <GeoJSON attribution="Settlement data from 2014 Census, Myanmar" data={this.state.settlements} ref={this.settlementRef} onEachFeature={this.onEachFeatureSettlement.bind(this)} pointToLayer={this.pointToLayer.bind(this)} />
                    )}
                  {/*  {this.state.settlements.map(settlement => (
                        <Circle
                            center={[settlement.latitude, settlement.longitude]}
                            pathOptions={{ fillColor: 'red' }}
                            radius={5}>
                            <Popup>
                            <em>{settlement.name}</em>
                            <p>Population : {settlement.population}</p>
                            </Popup>
                        </Circle>
                    ))}; */ }
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Feature group">
            </LayersControl.Overlay>
        </LayersControl>
  )
}
}

export default Layers;