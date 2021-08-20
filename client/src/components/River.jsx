import React, { useState } from 'react'
import axios from 'axios';

function River( {riverData} ){

    if(riverData === undefined){
        return(
            <p id="center">Nothing to show right now... Select a river segment from the map to view river data.</p>
        );
    }
    else {
        return(
            <p id="center">Hey you found a river. Unfortunately no data available yet... River id: {riverData} </p>
        );
    }

}

export default River;