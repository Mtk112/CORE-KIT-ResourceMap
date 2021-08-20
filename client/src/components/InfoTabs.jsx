import React, {useState} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {Card, CardHeader} from 'reactstrap';
import Solar from './Solar';
import Wind from './Wind';
import Settlement from './Settlement';
import River from './River';

function InfoTabs({solarData, monthData, settlementData, riverData, positionData}) {

    return (
        <div>
            <Card className = "card-plot">
                <CardHeader tag="h5">
                    <Tabs defaultActiveKey="solar" className="tabs">
                        <Tab eventKey="solar" title="Solar" id="tab">
                            <Solar solarData = {solarData} />
                        </Tab>
                        <Tab eventKey="wind" title="Wind" id="tab">
                            <Wind positionData = {positionData}/>
                        </Tab>
                        <Tab eventKey="hydro" title="Hydro" id="tab">
                            <River riverData = {riverData} />
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