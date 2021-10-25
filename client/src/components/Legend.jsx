import { useEffect } from "react";
import L from "leaflet";

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML =
          "<h4 id='center'>Map Legend</h4>" +
          "<b id='settlement'> Settlements </b>" + 
          "<b id='city'> City / Town </b> " + 
          "<b id='grid'> Medium Voltage Grid </b>" +
          "<b id='river'> River </b>" + 
          "<b id='district'> District </b>" + 
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
