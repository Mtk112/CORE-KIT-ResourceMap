import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function Solar( {solarData} ) {
    //console.log('This is solarData in Solar.jsx');

    /* Checks if solar data exist if it does create plotly graph */
    if(solarData.length === 0){
        return(
            <p id="center">Nothing to show right now... Click on the map to get solar data for the location</p>
        )
    }
    else{
        return(
            <>
                <Plot
                    data={[
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        y: solarData, 
                        type: 'scatter',
                        mode: 'lines',
                    }
                    ]}
                    layout={{width: 450, height: 250, margin: {l: 35, r: 15, b: 75, t: 35, pad: 2}, xaxis: {autotick: false, ticks: 'outside', tick0: 0, dtick: 1, title: 'Month'}, yaxis:{title: 'kWh / kWp'}, title: 'Dummy data sent all the way from <Map />' }}
                    config={{ modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d','zoomIn2d', 'zoomOut2d','resetScale2d'], responsive: true }}
                />
            </>
    
        )
    }
    
}

export default Solar;