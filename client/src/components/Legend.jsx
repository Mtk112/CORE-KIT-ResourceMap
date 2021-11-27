import { useEffect } from "react";
import L from "leaflet";

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML =
          "<h4>Map Legend</h4>" +
          "<b id='settlement0to99'> Settlements population 0 - 99 </b></br>" + 
          "<b id='settlement100to999'> Settlements population 100 - 999 </b></br>" + 
          "<b id='settlement1000to9999'> Settlements population 1000 - 9999 </b></br>" + 
          "<b id='settlement10k'> Settlements population > 10000 </b></br>" + 
          "<b id='city'> City / Town </b></br> " + 
          "<b id='grid'> Medium Voltage Grid </b></br>" +
          "<b id='river'> River </b></br>" + 
          "<b id='district'> District </b></br>" + 
          "<b id='township'> Township </b></br>" +
          "<b>Raster scale (Low </b>" + 
          "<img src='../viridis.png'> <b> High)</b>";
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
