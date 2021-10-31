import React, {useState} from 'react';
import { MapContainer, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import Layers from './Layers';
import InfoTabs from './InfoTabs';
import Legend from './Legend';
import {PopupDistrict, PopupLatLng, PopupRiver, PopupSettlement, PopupWindSolar, PopupTownship, PopupGrid} from './InfoPopup';
import 'leaflet/dist/leaflet.css';


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
  const [popupText, setPopupText] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [latlng, setLatLng] = useState('');



  // Sets month based on which month is selected from dropdown, this will be used for solar and wind raster overlays... if i can block map.click happening under the dropdown.

  // Adds a component for map clicks (for some reason the first click does not set position).
  function MyComponent() {
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

    const map = useMapEvents({
      click: (e) => {
        //gets solar & wind data from raster in database based on position
        setSettlement('');
        setRiver('');
        setDistrict('');
        setTownship('');
        setRiver('');
        setGrid('');
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        setLatLng(e.latlng);
        getSolarAtPoint(e.latlng.lat, e.latlng.lng);
        getWindAtPoint(e.latlng.lat, e.latlng.lng);
        var riverHtml = "", settlementHtml = "", districtHtml = "", townshipHtml = "", gridHtml = "";

        if(map.drawingPoints){

        }
        //creates bounds for area clicked. 
        var clickBounds = L.latLngBounds(e.latlng, e.latlng);
        var overlappingFeatures = [];
        //Goes through every layer active.
        for (var l in map._layers) {
          var overlay = map._layers[l];
          //checks that the layer has features i.e. that the layer is overlay.
          if (overlay._layers) {
            //goes through each feature
            for (var f in overlay._layers) {
              var feature = overlay._layers[f];
              var bounds;
              //gets bounds of the feature. 
              if (feature.getBounds) bounds = feature.getBounds();
              // create bounds for boundless features
              /*else if (feature._latlng) {
                console.log("I needed bounds!");
                bounds = L.latLngBounds(feature._latlng, feature._latlng);
              }*/
              //if feature and clicked area overlaps the feature gets added to the array.
              //** For some reason each overlapping feature gets added twice **
              if (bounds && clickBounds.overlaps(bounds)) {
                overlappingFeatures.push(feature);
              }
            }
          }
        }
        //checks that at least one feature was found
        if (overlappingFeatures.length) {
          //console.log(overlapingFeatures);
            overlappingFeatures.map(function(obj) {
            /*  Checks which layer the feature belongs to and saves the properties of the feature. 
                obj doesnt have layer data so layer is identified by unique property.              
            */
              if(obj.feature.properties.name){
                setSettlement(obj.feature.properties);
              }
              else if(obj.feature.properties.riverid){
                setRiver(obj.feature.properties);
              }
              else if(obj.feature.properties.name_2){
                setDistrict(obj.feature.properties);
              }
              else if(obj.feature.properties.name_3){
                setTownship(obj.feature.properties);
              }
              else if(obj.feature.properties.ex_from){
                setGrid(obj.feature.properties);
              }
              else{
                console.log('Unknown feature');
                console.log(obj);
              }
              return null;
            })
            
       }
        //Pans map to the location clicked ** ISSUE: Map height seem to still be 100vh, but container is set to 50vh? causes the setView to be at the very bottom of the resized map.
        //map.setView([e.latlng.lat, e.latlng.lng]);
       //if(wind && solar){
        //var avgWind = ((wind[0] + wind[1] + wind[2] + wind[3] + wind[4] + wind[5] + wind[6] + wind[7] + wind[8] + wind[9] + wind[10] + wind[11]) / 12).toFixed(2);
        //var avgSolar = ((solar[0] + solar[1] + solar[2] + solar[3] + solar[4] + solar[5] + solar[6] + solar[7] + solar[8] + solar[9] + solar[10] + solar[11]) / 12).toFixed(2);
        setPopupText ( settlementHtml + riverHtml + districtHtml + townshipHtml + gridHtml);
        //map.openPopup(html, e.latlng);
        //}
        
      }
    })
    return null;
  }

  //{avgWind && avgSolar && <InfoPopup avgWind = {avgWind} avgSolar = {avgSolar} popupText = {popupText} map={map} lat={lat} lng={lng} />}
  return (
    <>
      <MapContainer
        center={[20.7888, 97.0337]}
        zoom={9}
        style={{height: '60vh'}}
        preferCanvas={true}
        whenCreated={setMap}
      >
        <MyComponent/>
        <Layers />
        {/* Adds popup and adds relevant content to it based on which features are on the click location */}
        {latlng && <Popup position = {latlng}>
          <PopupLatLng  popupText={popupText} lat={lat} lng={lng}/>
          <PopupWindSolar avgWind={avgWind} avgSolar={avgSolar} />
          {settlement && <PopupSettlement settlement={settlement}/>}
          {district && <PopupDistrict district={district}/>}
          {township && <PopupTownship township={township}/>}
          {river && <PopupRiver river={river}/>}
          {grid && <PopupGrid grid={grid}/>}
        </Popup>}
        <Legend map={map}/>
      </MapContainer>
      {/* using solar data to check if map has been clicked. when map is clicked the infotabs component is rendered */}
      { solar && <InfoTabs key="infoTabs" solarData = {solar} settlementData = {settlement} riverData = {river} windData = {wind} / > }   
    </>
  )
}

  
export default Map;

