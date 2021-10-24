import React from 'react';
import { TileLayer, LayersControl } from 'react-leaflet';
import SettlementsOverlay from './SettlementsOverlay';
import RiversOverlay from './RiversOverlay';
import TownshipsOverlay from './TownshipsOverlay';
import MediumVoltageGrid from './MediumVoltageGrid';
import DistrictsOverlay from './DistrictsOverlay';
import CityTownOverlay from './CityTownOverlay';
import WindLayer from './WindLayer';
import SolarLayer from './SolarLayer';

// might change this to a functional component for consistancy.
function Layers() {
    /*Renders each base tilelayer, and overlay from each Overlay component.
    var solarPotential1 = L.leafletGeotiff('data/solar_potential_kwhperkwp.tif',
    {band: 0,
    opacity: .1,
    renderer: new L.LeafletGeotiff.Plotty({
      colorScale: 'rdbu',
      clampLow: false,
      clampHigh: true,
      displayMin: 3.5,
      displayMax: 6,
        }),
    });*/
    /*const options = {
        pixelValuesToColorFn: values => values[0] === -99.0 ? null : `rgba(${values[0]},${values[1]},${values[2]},${values[3]})`,
        resolution: 128,
        opacity: 0.5
    };*/
        return (
        //Adding tilelayers base layers to the leaflet map.
            <LayersControl position="topright">

                <LayersControl.BaseLayer checked name="MapBox.Streets">
                    <TileLayer
                        //attribution
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        //url where the tiles are loaded from.
                        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                        //id of the tiles to load (only needed for the mapbox tiles).
                        id='mapbox/streets-v11'
                        //access token for the tiles.
                        accessToken='pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="MapBox.Satellite">
                    <TileLayer
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                        id='mapbox/satellite-v9'
                        accessToken='pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="OpenTopoMap">
                    <TileLayer
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org/">SRTM</a> | map style: © <a href="https://opentopomap.org/">OpenTopoMap</a> <a href="https://creativecommons.org/licenses/by-sa/3.0/">(CC-BY-SA)</a>'
                        url='https://a.tile.opentopomap.org/{z}/{x}/{y}.png'
                    />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay checked name="Settlements">
                    <SettlementsOverlay />
                </LayersControl.Overlay>
            
                <LayersControl.Overlay name="Rivers">
                    <RiversOverlay />    
                </LayersControl.Overlay>

                <LayersControl.Overlay name="Townships">
                    <TownshipsOverlay />    
                </LayersControl.Overlay>

                <LayersControl.Overlay name="Medium Voltage Grid">
                    <MediumVoltageGrid />    
                </LayersControl.Overlay>

                <LayersControl.Overlay name="Districts">
                    <DistrictsOverlay />    
                </LayersControl.Overlay>
                <LayersControl.Overlay name="City / Town">
                    <CityTownOverlay />    
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Solar Potential Average Over 12 Months" >
                    <SolarLayer url={"https://raw.githubusercontent.com/Mtk112/CORE-KIT/master/inst/extdata/solar_potential_kwhperkwp.tif"}/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Wind Speed Average Over 12 Months" >
                    <WindLayer url={"https://raw.githubusercontent.com/Mtk112/CORE-KIT/master/inst/extdata/wind_potential.tif"}/>
                </LayersControl.Overlay>
            </LayersControl>
        )
}

export default Layers;