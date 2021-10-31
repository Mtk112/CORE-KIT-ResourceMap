import React from 'react'

function River( {riverData} ){

    if(riverData === undefined){
        return(
            <p id="center">Nothing to show right now... Select a river segment from the map to view river data.</p>
        );
    }
    else {
        return(
            <p id="center"> River id: {riverData.riverid} </p>
        );
    }

}

export default River;