import React, {Component} from 'react'
import { MapContainer } from 'react-leaflet'
import Layers from './Layers';

//
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '50vh',
      //mapClick: false,
    };
  }
  render(){
    return (
      <>
        <MapContainer
          center={[20.7888, 97.0337]}
          zoom={9}
          style={ {height: this.state.height } }
          whenReady={(map) => {
            map.target.on("click", function (e) {
              const {lat, lng} = e.latlng;
              console.log("Latitude: ", lat + ", Longitude: ", lng);
              console.log(map);
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

