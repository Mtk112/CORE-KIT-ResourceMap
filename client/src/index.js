import React from 'react';
import ReactDOM from 'react-dom';

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*

const SolarContent = (props) => {
  return(
    <React.Fragment>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            y: [5, 7, 10, 12, 13, 11, 10, 6, 9, 10, 5, 2], 
            type: 'scatter',
            mode: 'lines',
          }
        ]}
        layout={ {width: 400, height: 250, margin: {l: 35, r: 7, b: 75, t: 25, pad: 2}, xaxis: {autotick: false, ticks: 'outside', tick0: 0, dtick: 1, title: 'Month'}, yaxis:{title: 'kWh / kWp'}, title: 'Monthly Solar Potential'}}
        config={{ modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d','zoomIn2d', 'zoomOut2d','resetScale2d']}}
      />
    </React.Fragment>
  );
};

const WindContent = (props) => {
  return(
    <React.Fragment>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            y: [5, 7, 10, 12, 13, 11, 10, 6, 9, 10, 5, 2], 
            type: 'scatter',
            mode: 'lines',
          }
        ]}
        layout={ {width: 400, height: 250, margin: {l: 35, r: 7, b: 75, t: 25, pad: 2}, xaxis: {autotick: false, ticks: 'outside', tick0: 0, dtick: 1, title: 'Month'}, yaxis:{title: 'Windspeed (m/s)'}, title: 'Windspeed at 50m'}}
        config={{ modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d','zoomIn2d', 'zoomOut2d','resetScale2d']}}
      />
    </React.Fragment>
  );
};

const HydroContent = (props) => {
  return(
    <React.Fragment>
      <h3>Hydro charts</h3>
      Nothing here yet...
    </React.Fragment>
  );
};

const BioContent = (props) => {
  return(
    <React.Fragment>
      <h3>Biomass</h3>
      Nothing here yet...
    </React.Fragment>
  );
};

const SettlementContent = (props) => {
  return(
    <React.Fragment>
      <h3>Settlement</h3>
      Nothing here yet...
    </React.Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ResourceMap />
    <ResourceCard />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();
