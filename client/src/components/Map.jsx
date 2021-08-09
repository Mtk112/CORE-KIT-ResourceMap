import React, {Component} from 'react'
import { MapContainer } from 'react-leaflet'
import Layers from './Layers';


class Map extends Component {
  render(){
    return (
      <>
        <MapContainer 
          center={[20.7888, 97.0337]}
          zoom={7}
          style={{ height: '50vh'}}
        >
          <Layers />
        </MapContainer>
      </>
    )
  }
  }
  
export default Map

