import { React, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function Wind( {positionData} ) {
    const [windSpeeds, setWindSpeeds] = useState();

    async function getWindAtPoint(){
        const res = await axios.get('http://localhost:5000/windAtPoint/'+positionData[0]+ '/'+positionData[1]);
        const { data } = await res;
        setWindSpeeds(Object.values(data[0]));
    };

    if(positionData === undefined){
        return(
            <p id="center">Nothing to show right now... Click on map to show windspeed data.</p>
        );
    }
    else{
        getWindAtPoint();
        return(
            <>
                <Plot
                    data={[
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        y: windSpeeds,
                        type: 'scatter',
                        mode: 'lines',
                    }
                    ]}
                    layout={{width: 450, height: 250, margin: {l: 35, r: 15, b: 75, t: 35, pad: 2}, xaxis: {autotick: false, ticks: 'outside', tick0: 0, dtick: 1, title: 'Month'}, yaxis:{title: 'Windspeed (m/s)'}, title: 'Windspeed at 50m Dummy data'}}
                    config={{ modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d','zoomIn2d', 'zoomOut2d','resetScale2d'], responsive: true }}
                />
            </>
    
        )

    }
}

export default Wind;