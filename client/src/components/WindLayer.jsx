import { useEffect, useRef } from "react";
import proj4 from "proj4";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import chroma from "chroma-js";

window.proj4 = proj4;

const WindLayer = ({ url }) => {
  const geoTiffLayerRef = useRef();
  const context = useLeafletContext();
  const map = useMap();

  useEffect(() => {
    const container = context.layerContainer || context.map;

    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        parseGeoraster(arrayBuffer).then((georaster) => {
          const min = georaster.mins[0];
          const range = georaster.ranges[0];
          var scale = chroma.scale("Viridis");
            const options = {
              pixelValuesToColorFn: function(pixelValues) {
                var pixelValue = pixelValues.reduce((a, b) => a + b) / pixelValues.length; 
                // if there's zero wind, don't return a color
                if (pixelValue <= 0) return null;

                // scale to 0 - 1 used by chroma
                var scaledPixelValue = (pixelValue - min) / range;
                var color = scale(scaledPixelValue).hex();
                return color;
              },
              resolution : 128,
              opacity: 0.5
            }
          //console.log("georaster:", georaster);
          options.georaster = georaster;
          geoTiffLayerRef.current = new GeoRasterLayer(options);
          container.addLayer(geoTiffLayerRef.current);

          map.fitBounds(geoTiffLayerRef.current.getBounds());
        });
      });

    return () => {
        container.removeLayer(geoTiffLayerRef.current);
    };
  }, [context, url, map]);

  return null;
};

export default WindLayer;




