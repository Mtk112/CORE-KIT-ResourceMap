const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'corekit',
    password: 'admin',
    port: 5432,
});

const getSettlements = (request, response) => {
    pool.query(" SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, name, village_hh, population) As l )) As properties FROM public.settlements As lg ) As f", (error, results) => {
       if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getSettlement = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    const id = parseInt(request.params.id);
    pool.query('SELECT population, village_hh, name FROM public.settlements WHERE gid = $1', [id], (error, results) =>{
        if(error) {
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getRivers = (request, response) => {
    pool.query("SELECT row_to_json(fc) AS geojson FROM (SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON((geom),15,0)::json As geometry, row_to_json((lg)) As properties FROM public.rivers As lg) As f ) As fc", (error, results) => {
    //pool.query("SELECT jsonb_build_object('type', 'Feature', 'properties', to_jsonb(row) - 'gid' - 'geom') FROM (SELECT * FROM public.rivers) row;", (error, results) => {
        if (error) {
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getRiver = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM public.rivers WHERE gid = $1', [id], (error, results) =>{
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getTownships = (request, response) => {
    pool.query("SELECT row_to_json(fc) AS geojson FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) AS features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geometry, 4326),15,0)::json As geometry, row_to_json((*)) As properties FROM public.townships As lg) As f) As fc", (error, results) =>{
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getGrid = (request, response) => {
    pool.query('SELECT * FROM public.medium_voltage_grid ORDER BY gid ASC', (error, results) =>{
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getDistricts = (request, response) => {
    pool.query('SELECT * FROM public.districts ORDER BY gid ASC', (error, results) =>{
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getCityTown = (request, response) => {
    pool.query('SELECT * FROM public.city_town ORDER BY gid ASC', (error, results) =>{
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

module.exports = {
    getSettlements,
    getSettlement,
    getRivers,
    getRiver,
    getTownships,
    getGrid,
    getDistricts,
    getCityTown,
};