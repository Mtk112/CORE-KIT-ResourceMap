import React from 'react'

/* ISSUE -- this keeps looping once map is clicked */
function Settlement({settlementData}){


    //console.log('Settlement data in Settlement.jsx: ' + settlementData);
    if(settlementData === undefined){
        return(
            <p id="center">Nothing to show right now... Select a location from the map to view nearest settlement data.</p>
        );
    }
    else{
        return(
            <>
                <h3 id='center'>Nearest Settlement Information: </h3> 
                <p id='center'> Settlement name : {settlementData.name}</p>
                <p id='center'> Settlement population : {settlementData.population}</p>
                <p id='center'> Number of households : {settlementData.village_hh}</p>      
            </>
        );
    }

}

export default Settlement;