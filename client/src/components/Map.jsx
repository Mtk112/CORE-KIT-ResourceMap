import React, {useState} from 'react';
import { MapContainer, Popup, useMapEvents, Circle, Marker } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import Layers from './Layers';
import InfoTabs from './InfoTabs';
import Legend from './Legend';
import {PopupDistrict, PopupLatLng, PopupRiver, PopupSettlement, PopupWindSolar, PopupTownship, PopupGrid} from './InfoPopup';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


function Map() {
  // State variables
  //const [mapHeight, setMapHeight] = useState('100vh');
  const [map, setMap] = useState(null);
  const [solar, setSolar] = useState('');
  const [wind, setWind] = useState('');
  const [avgSolar, setAvgSolar] = useState('');
  const [avgWind, setAvgWind] = useState('');
  const [settlement, setSettlement] = useState('');
  const [district, setDistrict] = useState('');
  const [township, setTownship] = useState('');
  const [river, setRiver] = useState('');
  const [grid, setGrid] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [latlng, setLatLng] = useState('');

  const defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });
  // Sets month based on which month is selected from dropdown, this will be used for solar and wind raster overlays... if i can block map.click happening under the dropdown.

  // Adds a component for map clicks (for some reason the first click does not set position).
  function MapClick() {
    /* Data requests */
    // Gets solar_potential values from map click location.
    async function getSolarAtPoint(lat, lng){
      const res = await axios.get('http://localhost:5000/solarAtPoint/'+lat+'/'+lng);
      const { data } = await res;
      setSolar(Object.values(data[0]));
      var sum = Object.values(data[0]).reduce(function(a, b){
        return a + b;
      }, 0);
      setAvgSolar((sum /12).toFixed(2));
    };
     // Gets wind speed values from map click location.
    async function getWindAtPoint(lat, lng){
      const res = await axios.get('http://localhost:5000/windAtPoint/'+lat+'/'+lng);
      const { data } = await res;
      setWind(Object.values(data[0]));
      var sum = Object.values(data[0]).reduce(function(a, b){
        return a + b;
      }, 0);
      setAvgWind((sum / 12).toFixed(2));
    };
    //Gets district based on where map was clicked
    async function getDistrictAtPoint(lat, lng){
      const res = await axios.get('http://localhost:5000/districtAtPoint/'+lat+'/'+lng);
      const { data } = await res;
      setDistrict(data[0]);
    };
    //Gets township based on where map was clicked
    async function getTownshipAtPoint(lat, lng){
      const res = await axios.get('http://localhost:5000/townshipAtPoint/'+lat+'/'+lng);
      const { data } = await res;
      setTownship(data[0]);
    };
    //Gets nearest river based on where map was clicked
    async function getNearestRiver(lat, lng){
      const res = await axios.get('http://localhost:5000/nearestRiver/'+lat+'/'+lng);
      const { data } = await res;
      setRiver(data[0]);
    }
    //Gets nearest settlement based on where map was clicked
    async function getNearestSettlement(lat, lng){
      const res = await axios.get('http://localhost:5000/nearestSettlement/'+lat+'/'+lng);
      const { data } = await res;
      setSettlement(data[0]);
    }
    //Gets nearest settlement based on where map was clicked
    async function getNearestGrid(lat, lng){
      const res = await axios.get('http://localhost:5000/nearestGrid/'+lat+'/'+lng);
      const { data } = await res;
      setGrid(data[0]);
    }
    /* Map interaction */
    const map = useMapEvents({
      click: (e) => {
        //Reset states so that information from previous click is not shown.
        setSettlement('');
        setRiver('');
        setDistrict('');
        setTownship('');
        setRiver('');
        setGrid('');
        //saves lat and lng to be shown in the popup
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        // saves latlng for popup position
        setLatLng(e.latlng);
        getSolarAtPoint(e.latlng.lat, e.latlng.lng);
        getWindAtPoint(e.latlng.lat, e.latlng.lng);
        getNearestRiver(e.latlng.lat, e.latlng.lng);
        getNearestSettlement(e.latlng.lat, e.latlng.lng);
        getNearestGrid(e.latlng.lat, e.latlng.lng);
        getDistrictAtPoint(e.latlng.lat, e.latlng.lng);
        getTownshipAtPoint(e.latlng.lat, e.latlng.lng);
        map.setView(e.latlng);
      }
    })
    return null;
  }
  //{settlement && <Circle center={[settlement.latitude, settlement.longitude]} color="#000000" radius={5}/>}
  return (
    <>
      <MapContainer
        center={[20.7888, 97.0337]}
        zoom={9}
        style={{height: '60vh'}}
        preferCanvas={true}
        whenCreated={setMap}
      >
        <MapClick/>
        <Layers settlementData = {settlement} />
        { /* latlng && <Circle center={latlng} color="purple" radius={10}/> */}
        {/* Renders popup and adds relevant content to it based on which features are on the click location */}
        {latlng && <Marker position = {latlng} icon = {defaultIcon}> 
          <Popup position = {latlng}>
            <PopupLatLng lat={lat} lng={lng}/>
            <PopupWindSolar avgWind={avgWind} avgSolar={avgSolar} />
            {settlement && <PopupSettlement settlement={settlement}/>}
            {district && <PopupDistrict district={district}/>}
            {township && <PopupTownship township={township}/>}
            {river && <PopupRiver river={river}/>}
            {grid && <PopupGrid grid={grid}/>}
          </Popup>
        </Marker>}
        <Legend map={map}/>
      </MapContainer>
      {/* using solar data to check if map has been clicked. when map is clicked the infotabs component is rendered */}
      { solar && <InfoTabs key="infoTabs" solarData = {solar} settlementData = {settlement} riverData = {river} windData = {wind} / > }   
    </>
  )
}

  
export default Map;

