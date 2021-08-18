import React, { useState } from 'react'
import axios from 'axios';

function Settlement({settlementData}){
    const [settlement, setSettlement] = useState(''); 

    async function getSettlement(){
        const res = await axios.get('http://localhost:5000/settlement/' + settlementData);
        const { data } = await res;
        setSettlement(data[0]);
    };


    console.log('Settlement data in Settlement.jsx: ' + settlementData);
    if(settlementData === undefined){
        return(
            <p id="center">Nothing to show right now... Select a settlement from the map to view settlement data.</p>
        );
    }
    else{
        /* ISSUE -- this keeps looping once map is clicked */
        getSettlement();
        console.log(settlement);
        return(
            <>
                <h3 id='center'>General Village Information: </h3> 
                <p id='center'> Settlement name : {settlement.name}</p> 
                <p id='center'> Settlement population : {settlement.population}</p>
                <p id='center'> Number of households : {settlement.village_hh}</p>
                <p id='center'> District name : {settlement.district}</p>
                <p id='center'> Township name : {settlement.township}</p>       
            </>
        );
    }

}

export default Settlement;