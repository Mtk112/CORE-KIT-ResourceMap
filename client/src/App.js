import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, Circle, FeatureGroup, LayerGroup} from 'react-leaflet';
import {Card, CardBody,TabContent, TabPane, Nav, NavItem, NavLink, CardHeader} from 'reactstrap';

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/settlements' : 'production-url-here';


class App extends Component {
    state= {
        settlements:[]
    };
    componentDidMount() {
        fetch(API_URL)
        .then(response => response.json())
        .then(settlements => {
            this.setState({
                settlements
            });
        }); 
    };

  render(){
    return(
        <MapContainer className="map" center={ [20.7888, 97.0337] } zoom={7} >
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
  
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={[20.7888, 97.0337]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
  
          <LayersControl.Overlay checked name="Settlements">
            <LayerGroup>
                {this.state.settlements.map(settlements => (
                    <Circle
                        center={[settlements.latitude, settlements.longitude]}
                        pathOptions={{ fillColor: 'red' }}
                        radius={50}
                    />
                ))};
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    );
  };
};

export default App;