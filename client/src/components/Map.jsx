import React, {useState} from 'react';
import { MapContainer, useMapEvents, MapConsumer } from 'react-leaflet';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import L from 'leaflet';
import Layers from './Layers';
import InfoTabs from './InfoTabs';


function Map() {
  // State variables
  const [month, setMonth] = useState('January');
  const [mapHeight, setMapHeight] = useState('100vh');
  const [position, setPosition] = useState('');
  const [solar, setSolar] = useState('');  //setSolar([7, 5.5, 11, 15, 12, 10.5, 10, 8, 11, 7, 4, 4]);
  const [wind, setWind] = useState('');
  const [settlement, setSettlement] = useState([]);
  const [river, setRiver] = useState('');


  // Sets month based on which month is selected from dropdown, this will be used for solar and wind raster overlays... if i can block map.click happening under the dropdown.
  const change = (e) => {
    setMonth(e);  
  }

  // Adds a component for map clicks (for some reason the first click does not set position).
  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
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
        // if at least one feature found, show it
        if (overlapingFeatures.length) {
          console.log(overlapingFeatures);
            overlapingFeatures.map(function(obj) {
            /*  Checks which layer the feature belongs to and saves the gid of the feature. 
                obj doesnt have layer data so layer is identified by unique property.

                ISSUE!!! Doesnt save the gid when map is clicked. Instead saves it on a subsequent click and the gid is from the previous click.
              
            */
              if(obj.feature.properties.name){
                setSettlement(obj.feature.properties.gid);
              }
              else if(obj.feature.properties.riverid){
                console.log('Got to setRiver part..');
                setRiver(obj.feature.properties.riverid);
              }
              else{
                console.log('This feature is not a settlement nor a river.');
              }
              return null;
            })
       }
       console.log('Settlement : ' + settlement );
       console.log('River: ' + river);
        //console.log(e.latlng);
        map.panTo([e.latlng.lat, e.latlng.lng]);
        setSolar([7, 5.5, 11, 15, 12, 10.5, 10, 8, 11, 7, 4, 4]);
        if(mapHeight === '100vh'){
          setMapHeight('50vh');
        }
        //console.log('Map click. Position '+ position, ' solar: ' + solar);
      }
    })
    return null;
  }


  return (
    <>
      <MapContainer
        center={[20.7888, 97.0337]}
        zoom={9}
        style={{height: mapHeight}}
      >
        <MyComponent/>
        <DropdownButton id="dropdown-basic-button" title={month} onSelect={change}>
          <Dropdown.Item eventKey='January'>January</Dropdown.Item>
          <Dropdown.Item eventKey='February'>February</Dropdown.Item>
          <Dropdown.Item eventKey='March'>March</Dropdown.Item>
          <Dropdown.Item eventKey='April'>April</Dropdown.Item>
          <Dropdown.Item eventKey='May'>May</Dropdown.Item>
          <Dropdown.Item eventKey='June'>June</Dropdown.Item>
          <Dropdown.Item eventKey='July'>July</Dropdown.Item>
          <Dropdown.Item eventKey='August'>August</Dropdown.Item>
          <Dropdown.Item eventKey='September'>September</Dropdown.Item>
          <Dropdown.Item eventKey='October'>October</Dropdown.Item>
          <Dropdown.Item eventKey='November'>November</Dropdown.Item>
          <Dropdown.Item eventKey='December' >December</Dropdown.Item>
        </DropdownButton>
        <Layers />
      </MapContainer>
      {/* using solar data to check if map has been clicked. when map is clicked the infotabs component is rendered */}
      { solar && <InfoTabs key="infoTabs" solarData = {solar} monthData = {month} settlementData = {settlement} riverData = {river} positionData = {position} / > }   
    </>
  )
}

  
export default Map;

