import React from 'react'

/* ISSUE -- this keeps looping once map is clicked */
function Settlement({settlementData}){


    //console.log('Settlement data in Settlement.jsx: ' + settlementData);
    if(settlementData === undefined){
        return(
            <p id="center">Nothing to show right now... Select a settlement from the map to view settlement data.</p>
        );
    }
    else{
        /*  If settlement data is missing village_hh and district data is missing show them as 'Unknown' */
        if( settlementData.village_hh === null && settlementData.district === null){
            return(
                <>
                    <h3 id='center'>General Village Information: </h3> 
                    <p id='center'> Settlement name : {settlementData.name}</p>
                    <p id='center'> Settlement population : {settlementData.population}</p>
                    <p id='center'> Number of households : Unknown</p>
                    <p id='center'> District name : Unknown</p>
                    <p id='center'> Township name : Unknown</p>       
                </>
            );
        }
        // If number of households is missing
        else if(settlementData.village_hh === null){
            return(
                <>
                    <h3 id='center'>General Village Information: </h3> 
                    <p id='center'> Settlement name : {settlementData.name}</p>
                    <p id='center'> Settlement population : {settlementData.population}</p>
                    <p id='center'> Number of households : Unknown</p>
                    <p id='center'> District name : {settlementData.district}</p>
                    <p id='center'> Township name : {settlementData.township}</p>       
                </>
            );
        }
        /*  If just district is missing */ 
        else if(settlementData.district === null){
            return(
                <>
                    <h3 id='center'>General Village Information: </h3> 
                    <p id='center'> Settlement name : {settlementData.name}</p>
                    <p id='center'> Settlement population : {settlementData.population}</p>
                    <p id='center'> Number of households : {settlementData.village_hh}</p>
                    <p id='center'> District name : Unknown</p>
                    <p id='center'> Township name : Unknown</p>       
                </>
            );

        }
        else{
            return(
                <>
                    <h3 id='center'>General Village Information: </h3> 
                    <p id='center'> Settlement name : {settlementData.name}</p>
                    <p id='center'> Settlement population : {settlementData.population}</p>
                    <p id='center'> Number of households : {settlementData.village_hh}</p>
                    <p id='center'> District name : {settlementData.district}</p>
                    <p id='center'> Township name : {settlementData.township}</p>       
                </>
            );

        }
            
    }

}

export default Settlement;