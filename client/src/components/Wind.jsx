import React from 'react';
import Plot from 'react-plotly.js';

function Wind( {windData} ) {


    if(windData.length === 0){
        return(
            <p id="center">Nothing to show right now... Click on map to show windspeed data.</p>
        );
    }
    else{
        return(
            <>
                <Plot
                    data={[
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        y: windData,
                        type: 'scatter',
                        mode: 'lines',
                    }
                    ]}
                    layout={{width: 450, height: 200, margin: {l: 40, r: 15, b: 75, t: 35, pad: 2}, xaxis: {autotick: false, ticks: 'outside', tick0: 0, dtick: 1, title: 'Month'}, yaxis:{title: 'Windspeed (m/s)'}, title: 'Windspeed (at 50m) at location'}}
                    config={{ modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d','zoomIn2d', 'zoomOut2d','resetScale2d'], responsive: true }}
                />
            </>
    
        )

    }
}

export default Wind;