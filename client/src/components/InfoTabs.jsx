import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {Card, CardHeader} from 'reactstrap';
import Solar from './Solar';
import Wind from './Wind';


class InfoTabs extends Component {
    render(){
        return (
            <div>
              <Card className = "card-plot">
                <CardHeader tag="h5">
                    <Tabs defaultActiveKey="solar" className="tabs">
                        <Tab eventKey="solar" title="Solar" id="tab">
                            <p id="center">Select location from the map to view solar data.</p>
                            <Solar />
                        </Tab>
                        <Tab eventKey="wind" title="Wind" id="tab">
                            <p id="center">Select location from the map to view wind data.</p>
                            <Wind />
                        </Tab>
                        <Tab eventKey="hydro" title="Hydro" id="tab">
                            <p id="center">Select a river segment from the map to view river data.</p>
                        </Tab>
                        <Tab eventKey="settlement" title="Settlement" id="tab">
                            <p id="center">Select a settlement from the map to view settlement data.</p>
                        </Tab>
                    </Tabs>
                </CardHeader>
              </Card>
            </div>
          );
    };

};

export default InfoTabs;