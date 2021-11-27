import React, { Component } from 'react';
import axios from 'axios';
import { GeoJSON } from 'react-leaflet';

//might change this to a functional component for consistancy.
class DistrictsOverlay extends Component {
    constructor(){
        super();
        this.state = {
          districts: null,
          districtsRef: null
        }  
    }

    onEachFeature(feature, layer) {
        /* Ensures that this layer is added to the bottom of the layer stack as to not interfere with map clicks. */
        layer.on({
            'add': function(){
              layer.bringToBack()
            }
        });
    };
    // gets District data from PostgreSQL.
    async getDistricts(){
        const res = await axios.get('http://localhost:5000/districts');
        const { data } = await res;
        let reference = React.createRef();
        this.setState({districts: data[0], districtsRef: reference});
        //console.log(this.state.districts);
    };
    componentDidMount() {
        this.getDistricts();
    };

    render(){
        //changes the color of features on this layer
        const style = {
            color: '#A52A2A',
            fillColor: '#A52A2A'
        };
        return(
            this.state.districts && (
                <GeoJSON data={this.state.districts} ref={this.districtsRef} onEachFeature={this.onEachFeature.bind(this)} style={style} />
            )
        );
    };
};

export default DistrictsOverlay;