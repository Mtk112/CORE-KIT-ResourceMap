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

  // Sets month based on which month is selected from dropdown, this will be used for solar and wind raster overlays... if i can block map.click happening under the dropdown.
  const change = (e) => {
    setMonth(e);  
  }

  // Adds a component for map clicks (for some reason the first click does not set position).
  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        var clickBounds = L.latLngBounds(e.latlng, e.latlng);
        var intersectingFeatures = [];
        for (var l in map._layers) {
          var overlay = map._layers[l];
          if (overlay._layers) {
            for (var f in overlay._layers) {
              var feature = overlay._layers[f];
              var bounds;
              if (feature.getBounds) bounds = feature.getBounds();
              else if (feature._latlng) {
                bounds = L.latLngBounds(feature._latlng, feature._latlng);
              }
              if (bounds && clickBounds.intersects(bounds)) {
                intersectingFeatures.push(feature);
              }
            }
          }
        }
        // if at least one feature found, show it
        
        if (intersectingFeatures.length) {
          if (intersectingFeatures.length) {
            var html = "Found features: " + intersectingFeatures.length + "<br/>" + intersectingFeatures.map(function(o) {
              console.log(o.feature.properties);
              return o.feature.properties.name;
            }).join('<br/>');

          map.openPopup(html, e.latlng, {
            offset: L.point(0, -24)
          });
        }
      }
        //console.log(e.latlng);
        setPosition([e.latlng.lat, e.latlng.lng]);
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
      { solar && <InfoTabs key="infoTabs" solarData = {solar} monthData = {month} / > }   
    </>
  )
}

  
export default Map;

