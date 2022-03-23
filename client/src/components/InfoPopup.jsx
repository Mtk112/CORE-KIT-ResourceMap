

function PopupLatLng({lat , lng }) {           
  return(
    <>
          <h4>Coordinates</h4>
          <p id="line">Latitude: {lat}<br/>Longitude: {lng}</p>                    
    </>
  );
}

export {PopupLatLng};

function PopupWindSolar({avgWind, avgSolar}){
  if(avgWind > 0 || avgSolar > 0){
    return(
      <>
            <h4>Solar & Wind</h4>
            <p id="line">Average Yearly Solar Potential (kWh / kWp) {avgSolar} <br/> Average Yearly Wind Speed at 50 m (m/s): {avgWind}</p>
      </>
    );
  }
  else{
    return null;
  }
}
export {PopupWindSolar}

function PopupSettlement({settlement}){
  return(
    <>
          <h4>Settlement</h4>
          <p id="line">Settlement: {settlement.name}</p>
          <p id="line">Population: {settlement.population} </p>
    </>
  );
}

export {PopupSettlement}

function PopupRiver({river}){
  return(
  <>
      <h4>River</h4>
      <p id="line">River ID: {river.riverid}</p>
  </>
  );
}
export {PopupRiver}

function PopupDistrict({district}){
  return(
    <>
      <h4>District</h4>
      <p id="line">District: {district.dt} / {district.dt_mmr4}</p>     
    </>
  )
}
export {PopupDistrict}

function PopupTownship({township}){
  return(
    <>
      <h4>Township</h4>
      <p id="line">Township: {township.ts} / {township.ts_mmr4}</p>
    </>
  )
}
export {PopupTownship}

function PopupGrid({grid}){
  return(
    <>
      <h4>Medium Voltage Grid</h4>
      <p id="line">Medium voltage grid id:  {grid.gid}</p>
    </>
  )
}
export {PopupGrid}

