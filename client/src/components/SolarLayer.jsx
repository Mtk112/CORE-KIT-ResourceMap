import { useEffect, useRef } from "react";
import proj4 from "proj4";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import chroma from "chroma-js";

window.proj4 = proj4;

const SolarLayer = ({ url }) => {
    const geoTiffLayerRef = useRef();
    const context = useLeafletContext();
    const map = useMap();
  
    useEffect(() => {
      const container = context.layerContainer || context.map;
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          parseGeoraster(arrayBuffer).then((georaster) => {
            var scale = chroma.scale("Viridis");
              const options = {
                pixelValuesToColorFn: function(pixelValues) {
                  var pixelValue = pixelValues.reduce((a, b) => a + b) / pixelValues.length;
                  //console.log(pixelValue);
                  // if there is no value, doesn't return a color
                  if (pixelValue <= 0) return null;
                  // scale to 0 - 1 used by chroma, Solar raster contains negative values, which forces the scaling to be done by hand.
                  var scaledPixelValue = (pixelValue - 2.5) / 2.8;
                  var color = scale(scaledPixelValue).hex();
  
                  return color;
                },
                resolution : 128,
                opacity: 0.7
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

export default SolarLayer;