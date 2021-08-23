import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';

class TownshipsOverlay extends Component{
    constructor(){
        super();
        this.state = {
          townships: null,
          townshipsRef: null
        };
    };
    onEachFeature(feature, layer) {
        layer.on({
          'click': function (e) {
            console.log('TownshipID: ', e.target.feature.properties.gid + ', Township name: ',  e.target.feature.properties.name_3);  
           }
        });
        /* Ensures that this layer is added to the bottom of the layer stack as to not interfere with map clicks */
        layer.on({
            'add': function(){
              layer.bringToBack()
            }
         });
    };

    // gets Township data from PostgreSQL
    async getTownships(){
        const res = await axios.get('http://localhost:5000/townships');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({townships: data[0], townshipsRef: reference});
        //console.log(this.state.townships);
    };
    componentDidMount() {
        this.getTownships();
    };

    render(){
        //changing the color of the features in this layer
        const style = {
            color: '#228B22',
            fillColor: '#228B22'
        };

        return(
            this.state.townships && (
            <GeoJSON data={this.state.townships} ref={this.townshipsRef} onEachFeature={this.onEachFeature.bind(this)} style={style} />
            )
        )
    };
    
}

export default TownshipsOverlay;