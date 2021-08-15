import React, {Component} from 'react'
import { MapContainer } from 'react-leaflet'
import Layers from './Layers';



class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //lat: null,
      //lng: null
    };
  } 
  render(){
    return (
      <>
        <MapContainer
          center={[20.7888, 97.0337]}
          zoom={9}
          style={{ height: '50vh'}}
          whenReady={(map) => {
            map.target.on("click", function (e) {
              const {lat, lng} = e.latlng;
              console.log("Latitude: ", lat + " Longitude: ", lng);
            });
          }}
        >
          <Layers />
        </MapContainer>
      </>
    )
  }
}
  
export default Map;

