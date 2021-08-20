import React, { useState } from 'react'
import axios from 'axios';

/* ISSUE -- this keeps looping once map is clicked */
function Settlement({settlementData}){
    const [settlement, setSettlement] = useState(''); 

    async function getSettlement(){
        const res = await axios.get('http://localhost:5000/settlement/' + settlementData);
        const { data } = await res;
        setSettlement(data[0]);
    };


    //console.log('Settlement data in Settlement.jsx: ' + settlementData);
    if(settlementData === undefined){
        return(
            <p id="center">Nothing to show right now... Select a settlement from the map to view settlement data.</p>
        );
    }
    else{
        getSettlement();
        //console.log(settlement);
        /*  If settlement data is missing village_hh and district data is missing show them as 'Unknown' */
        if( settlement.village_hh === null && settlement.district === null){
            return(
                <>
                    <h3 id='center'>General Village Information: </h3> 
                    <p id='center'> Settlement name : {settlement.name}</p>
                    <p id='center'> Settlement population : {settlement.population}</p>
                    <p id='center'> Number of households : Unknown</p>
                    <p id='center'> District name : Unknown</p>
                    <p id='center'> Township name : Unknown</p>       
                </>
            );
        }
        // If number of households is missing
        else if(settlement.village_hh === null){
            return(
                <>
                    <h3 id='center'>General Village Information: </h3> 
                    <p id='center'> Settlement name : {settlement.name}</p>
                    <p id='center'> Settlement population : {settlement.population}</p>
                    <p id='center'> Number of households : Unknown</p>
                    <p id='center'> District name : {settlement.district}</p>
                    <p id='center'> Township name : {settlement.township}</p>       
                </>
            );
        }
        /*  If just district is missing */ 
        else if(settlement.district === null){
            return(
                <>
                    <h3 id='center'>General Village Information: </h3> 
                    <p id='center'> Settlement name : {settlement.name}</p>
                    <p id='center'> Settlement population : {settlement.population}</p>
                    <p id='center'> Number of households : {settlement.village_hh}</p>
                    <p id='center'> District name : Unknown</p>
                    <p id='center'> Township name : Unknown</p>       
                </>
            );

        }
        else{
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

}

export default Settlement;