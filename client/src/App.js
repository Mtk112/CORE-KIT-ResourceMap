import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import InfoTabs from './components/InfoTabs';


class App extends Component{

  render(){
    return([
        <Map key="map"/>,
        <InfoTabs key="infoTabs"/>
    ]);
  };
}

export default App;
