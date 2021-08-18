import React, {useState} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {Card, CardHeader} from 'reactstrap';
import Solar from './Solar';
import Wind from './Wind';
import Settlement from './Settlement';

function InfoTabs({solarData, monthData, settlementData}) {
    const [month, setMonthData] = useState(monthData); 
    //testing
    const [solar, setSolarData] = useState(solarData);
    console.log('settlementData in InfoTabs.jsx ' + settlementData);

    return (
        <div>
            <Card className = "card-plot">
                <CardHeader tag="h5">
                    <Tabs defaultActiveKey="solar" className="tabs">
                        <Tab eventKey="solar" title="Solar" id="tab">
                            <Solar solarData = {solar} />
                        </Tab>
                        <Tab eventKey="wind" title="Wind" id="tab">
                            <p id="center">Nothing to show right now... Select location from the map to view wind data.</p>
                            <Wind />
                        </Tab>
                        <Tab eventKey="hydro" title="Hydro" id="tab">
                            <p id="center">Nothing to show right now... Select a river segment from the map to view river data.</p>
                        </Tab>
                        <Tab eventKey="settlement" title="Settlement" id="tab">
                            <Settlement settlementData = {settlementData}/>
                        </Tab>
                    </Tabs>
                </CardHeader>
            </Card>
        </div>
    );

};

export default InfoTabs;