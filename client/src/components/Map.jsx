import React, {useState} from 'react';
import { MapContainer, useMapEvents } from 'react-leaflet';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import L from 'leaflet';
import Layers from './Layers';
import InfoTabs from './InfoTabs';
import Legend from './Legend'
import 'leaflet/dist/leaflet.css';


function Map() {
  // State variables
  //const [mapHeight, setMapHeight] = useState('100vh');
  const [map, setMap] = useState(null);
  const [solar, setSolar] = useState('');
  const [wind, setWind] = useState('');
  const [settlement, setSettlement] = useState([]);
  const [river, setRiver] = useState('');


  // Sets month based on which month is selected from dropdown, this will be used for solar and wind raster overlays... if i can block map.click happening under the dropdown.

  // Adds a component for map clicks (for some reason the first click does not set position).
  function MyComponent() {
    // Gets solar_potential values from map click location.
    async function getSolarAtPoint(lat, lng){
      const res = await axios.get('http://localhost:5000/solarAtPoint/'+lat+'/'+lng);
      const { data } = await res;
      setSolar(Object.values(data[0]));
    };
     // Gets wind speed values from map click location.
    async function getWindAtPoint(lat, lng){
      const res = await axios.get('http://localhost:5000/windAtPoint/'+lat+'/'+lng);
      const { data } = await res;
      setWind(Object.values(data[0]));
      
    };

    async function getSolarAvgAtPoint(lat, lng){
      const res = await axios.get('http://localhost:5000/solarAtPoint/'+lat+'/'+lng);
      const { data } = await res;
      const value =(Object.values(data[0]));
      return value;
    };

    const map = useMapEvents({
      click: (e) => {
        //gets solar & wind data from raster in database based on position
        getSolarAtPoint(e.latlng.lat, e.latlng.lng);
        getWindAtPoint(e.latlng.lat, e.latlng.lng);
        var riverHtml = "", settlementHtml = "", districtHtml = "", townshipHtml = "", gridHtml = "";
        //creates bounds for area clicked. 
        var clickBounds = L.latLngBounds(e.latlng, e.latlng);
        var overlapingFeatures = [];
        //Goes through every layer active.
        for (var l in map._layers) {
          var overlay = map._layers[l];
          //checks that the layer has features i.e. that the layer is overlay.
          if (overlay._layers) {
            //goes through each feature
            for (var f in overlay._layers) {
              var feature = overlay._layers[f];
              var bounds;
              //checks if feature has bounds. incase it doesn't creates bounds.
              if (feature.getBounds) bounds = feature.getBounds();
              else if (feature._latlng) {
                bounds = L.latLngBounds(feature._latlng, feature._latlng);
              }
              //if feature and clicked area overlaps the feature gets added to the array.
              //** For some reason each overlaping feature gets added twice **
              if (bounds && clickBounds.overlaps(bounds)) {
                overlapingFeatures.push(feature);
              }
            }
          }
        }
        //checks that at least one feature was found
        if (overlapingFeatures.length) {
          //console.log(overlapingFeatures);
            overlapingFeatures.map(function(obj) {
            /*  Checks which layer the feature belongs to and saves the gid of the feature. 
                obj doesnt have layer data so layer is identified by unique property.              
            */
              if(obj.feature.properties.name){
                setSettlement(obj.feature.properties);
                settlementHtml ="</br><h4>Settlement</h1> Settlement: " + obj.feature.properties.name;
              }
              else if(obj.feature.properties.riverid){
                setRiver(obj.feature.properties.riverid);
                riverHtml = "</br><h4>River</h1> River ID: " + obj.feature.properties.riverid;
              }
              else if(obj.feature.properties.name_2){
                districtHtml = "</br><h4>District</h1> District: " + obj.feature.properties.name_2;
              }
              else if(obj.feature.properties.name_3){
                townshipHtml = "</br><h4>Township</h1> Township: " + obj.feature.properties.name_3;
              }
              else if(obj.feature.properties.ex_from){
                gridHtml = "</br><h4>Medium Voltage Grid</h1> Medium voltage grid ID: " + obj.feature.properties.gid;
              }
              else{
                console.log('Unknown feature...: ' +obj);
              }
              return null;
            })
            
       }
        //Pans map to the location clicked ** ISSUE: Map height seem to still be 100vh, but container is set to 50vh? causes the setView to be at the very bottom of the resized map.
        //map.setView([e.latlng.lat, e.latlng.lng]);

       var avgWind = null;
       var avgSolar = null;
       if(wind && solar){
        avgWind = ((wind[0] + wind[1] + wind[2] + wind[3] + wind[4] + wind[5] + wind[6] + wind[7] + wind[8] + wind[9] + wind[10] + wind[11]) / 12).toFixed(2);
        avgSolar = ((solar[0] + solar[1] + solar[2] + solar[3] + solar[4] + solar[5] + solar[6] + solar[7] + solar[8] + solar[9] + solar[10] + solar[11]) / 12).toFixed(2);
        var html = "<h4>Coordinates</h4> Latitude: " + e.latlng.lat + "</br> Longitude: " + e.latlng.lng + "<h4>Wind & Solar </h4> Average wind speed (m/s) " + avgWind + "</br> Average solar potential kwp per kwh: " + avgSolar  + settlementHtml + riverHtml + districtHtml + townshipHtml + gridHtml;
        map.openPopup(html, e.latlng);
       }
        
      }
    })
    return null;
  }


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
        <Legend map={map}/>
      </MapContainer>
      {/* using solar data to check if map has been clicked. when map is clicked the infotabs component is rendered */}
      { solar && <InfoTabs key="infoTabs" solarData = {solar} settlementData = {settlement} riverData = {river} windData = {wind} / > }   
    </>
  )
}

  
export default Map;

