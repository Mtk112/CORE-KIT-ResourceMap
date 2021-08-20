const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
    //response.sendFile(path.join(__dirname, '...', 'client', 'src', 'index.js'));
});

app.get('/settlements', db.getSettlements);
app.get('/rivers', db.getRivers);
app.get('/townships', db.getTownships);
app.get('/grid', db.getGrid);
app.get('/districts', db.getDistricts);
app.get('/city_town', db.getCityTown);
app.get('/settlement/:id', db.getSettlement);
app.get('/windAtPoint/:lat/:lng', db.getWindAtPoint);
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});