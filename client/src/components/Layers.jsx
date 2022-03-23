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

/*
    Additional layer...
    <LayersControl.BaseLayer name="OpenTopoMap">
                    <TileLayer
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org/">SRTM</a> | map style: © <a href="https://opentopomap.org/">OpenTopoMap</a> <a href="https://creativecommons.org/licenses/by-sa/3.0/">(CC-BY-SA)</a>'
                        url='https://a.tile.opentopomap.org/{z}/{x}/{y}.png'
                    />
                </LayersControl.BaseLayer>
*/
function Layers() {
        return (
        //Adding tilelayers base layers to the leaflet map.
            <LayersControl position="topright">

                <LayersControl.BaseLayer checked name="Streets">
                    <TileLayer
                        //attribution
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        //url where the tiles are loaded from.
                        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                        //id of the tiles to load (only needed for the mapbox tiles).
                        id='mapbox/streets-v11'
                        //access token for the tiles.
                        accessToken='Your-AccessToken-Here'
                        
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                        id='mapbox/satellite-v9'
                        accessToken='Your-AccessToken-Here'
                        
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satellite-Streets">
                    <TileLayer
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
                        id='mapbox/satellite-streets-v11'
                        accessToken='Your-AccessToken-Here'

                    />
                </LayersControl.BaseLayer>

                <LayersControl.Overlay checked name="Settlements">
                    <SettlementsOverlay/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Rivers">
                    <RiversOverlay/>    
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Townships">
                    <TownshipsOverlay/>    
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Medium Voltage Grid">
                    <MediumVoltageGrid/>    
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Districts">
                    <DistrictsOverlay/>    
                </LayersControl.Overlay>
                <LayersControl.Overlay name="City / Town">
                    <CityTownOverlay/>    
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