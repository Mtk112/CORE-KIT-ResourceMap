import { React,Component } from 'react';
import Plot from 'react-plotly.js';

class Wind extends Component{
    render(){
        return(
            <>
                <Plot
                    data={[
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        y: [5, 7, 10, 12, 13, 11, 10, 6, 9, 10, 5, 2], 
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