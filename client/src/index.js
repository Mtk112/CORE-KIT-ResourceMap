import React from 'react';
import ReactDOM from 'react-dom';
import Plot from 'react-plotly.js';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, Circle, FeatureGroup, LayerGroup} from 'react-leaflet';
import {Card, CardBody,TabContent, TabPane, Nav, NavItem, NavLink, CardHeader} from 'reactstrap';

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

const ResourceMap = (props) => {
  return(
    <MapContainer className="map" center={ [20.7888, 97.0337] } zoom={7} > {/*maxZoom={17} minZoom={6}  Not sure whether to limit zoom*/}
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

        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            <Circle
              center={[20.7888, 97.0337]}
              pathOptions={{ fillColor: 'blue' }}
              radius={200}
            />
            <Circle
              center={[20.7888, 97.0337]}
              pathOptions={{ fillColor: 'red' }}
              radius={100}
              stroke={false}
            />
            <LayerGroup>
              <Circle
                center={[51.51, -0.08]}
                pathOptions={{ color: 'green', fillColor: 'green' }}
                radius={100}
              />
            </LayerGroup>
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Feature group">
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

const ResourceCard = (props) => {
  const [activeTab, setActiveTab] = React.useState('solar');
  return (
    <div>
      <Card className = "card-plot">
        <CardHeader tag="h5">
          <Nav tabs fill>
            <NavItem>
              <NavLink active={activeTab === 'solar'} onClick={() =>
                setActiveTab('solar')}> Solar
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === 'wind'} onClick={() =>
                setActiveTab('wind')}> Wind
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === 'hydro'} onClick={() =>
                setActiveTab('hydro')}> Hydro
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === 'bio'} onClick={() =>
                setActiveTab('bio')}> Biomass
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activeTab === 'settlement'} onClick={() =>
                setActiveTab('settlement')}> Settlement
            </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="solar">
              <SolarContent/>
            </TabPane>
            <TabPane tabId="wind">
              <WindContent/>
            </TabPane>
            <TabPane tabId="hydro">
              <HydroContent/>
            </TabPane>
            <TabPane tabId="bio">
              <BioContent/>
            </TabPane>
            <TabPane tabId="settlement">
              <SettlementContent/>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

const SolarContent = (props) => {
  return(
    <React.Fragment>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            y: [5, 7, 10, 12, 13, 11, 10, 6, 9, 10, 5, 2], 
            type: 'scatter',
            mode: 'lines',
          }
        ]}
        layout={ {width: 400, height: 250, margin: {l: 35, r: 7, b: 75, t: 25, pad: 2}, xaxis: {autotick: false, ticks: 'outside', tick0: 0, dtick: 1, title: 'Month'}, yaxis:{title: 'kWh / kWp'}, title: 'Monthly Solar Potential'}}
        config={{ modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d','zoomIn2d', 'zoomOut2d','resetScale2d']}}
      />
    </React.Fragment>
  );
};

const WindContent = (props) => {
  return(
    <React.Fragment>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            y: [5, 7, 10, 12, 13, 11, 10, 6, 9, 10, 5, 2], 
            type: 'scatter',
            mode: 'lines',
          }
        ]}
        layout={ {width: 400, height: 250, margin: {l: 35, r: 7, b: 75, t: 25, pad: 2}, xaxis: {autotick: false, ticks: 'outside', tick0: 0, dtick: 1, title: 'Month'}, yaxis:{title: 'Windspeed (m/s)'}, title: 'Windspeed at 50m'}}
        config={{ modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d','zoomIn2d', 'zoomOut2d','resetScale2d']}}
      />
    </React.Fragment>
  );
};

const HydroContent = (props) => {
  return(
    <React.Fragment>
      <h3>Hydro charts</h3>
      Nothing here yet...
    </React.Fragment>
  );
};

const BioContent = (props) => {
  return(
    <React.Fragment>
      <h3>Biomass</h3>
      Nothing here yet...
    </React.Fragment>
  );
};

const SettlementContent = (props) => {
  return(
    <React.Fragment>
      <h3>Settlement</h3>
      Nothing here yet...
    </React.Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ResourceMap />
    <ResourceCard />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
