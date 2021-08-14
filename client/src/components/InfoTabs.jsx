import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {Card, CardHeader} from 'reactstrap';


class InfoTabs extends Component {
    render(){
        return (
            <div>
              <Card className = "card-plot">
                <CardHeader tag="h5">
                    <Tabs defaultActiveKey="solar" className="tabs">
                        <Tab eventKey="solar" title="Solar" id="tab">
                            No solar data available.
                        </Tab>
                        <Tab eventKey="wind" title="Wind" id="tab">
                            No wind data available.
                        </Tab>
                        <Tab eventKey="hydro" title="Hydro" id="tab">
                            No hydro data available
                        </Tab>
                        <Tab eventKey="settlement" title="Settlement" id="tab">
                            No settlement data available
                        </Tab>
                    </Tabs>
                </CardHeader>
              </Card>
            </div>
          );
    };

};

export default InfoTabs;