const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'corekit',
    password: 'admin',
    port: 5432,
});

// Gets all settlements
const getSettlements = (request, response) => {
    pool.query(" SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, name, village_hh, population, district, township) As l )) As properties FROM public.settlements As lg ) As f", (error, results) => {
       if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// Gets data from a specific settlement
const getSettlement = (request, response) => {
    const gid = parseInt(request.params.id);
    pool.query('SELECT name, village_hh, population, district, township FROM public.settlements WHERE gid = $1', [gid], (error, results) =>{
        if(error) {
            throw error;
        };
        response.status(200).json(results.rows);
    });
}


const getRivers = (request, response) => {
    pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT riverid) As l )) As properties FROM public.rivers As lg ) As f", (error, results) => {
    //pool.query("SELECT row_to_json(fc) AS geojson FROM (SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON((geom),15,0)::json As geometry, row_to_json((lg)) As properties FROM public.rivers As lg) As f ) As fc", (error, results) => {
    //pool.query("SELECT jsonb_build_object('type', 'Feature', 'properties', to_jsonb(row) - 'gid' - 'geom') FROM (SELECT * FROM public.rivers) row;", (error, results) => {
        if (error) {
            throw error;
        };
        response.status(200).json(results.rows);
    });
};


const getTownships = (request, response) => {
    pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, name_3) As l )) As properties FROM public.townships As lg ) As f", (error, results) => {
    //pool.query("SELECT row_to_json(fc) AS geojson FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) AS features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geometry, 4326),15,0)::json As geometry, row_to_json((*)) As properties FROM public.townships As lg) As f) As fc", (error, results) =>{
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getGrid = (request, response) => {
    pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, ex_from, ex_to) As l )) As properties FROM public.medium_voltage_grid As lg ) As f", (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getDistricts = (request, response) => {
    pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, name_2, varname_2) As l )) As properties FROM public.districts As lg ) As f", (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getCityTown = (request, response) => {
    pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, city__town ) As l )) As properties FROM public.city_town As lg ) As f", (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getWindAtPoint = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    // Gets the wind value based on location... I have to specify each band by hand, PostGIS doc did not have a way to get value from all bands at once.
    pool.query("SELECT ST_Value(rast, 1 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) As b1val ,ST_Value(rast, 2 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b2val, ST_Value(rast, 3 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b3val, ST_Value(rast, 4 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b4val, ST_Value(rast, 5 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b5val, ST_Value(rast, 6 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b6val, ST_Value(rast, 7 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b7val, ST_Value(rast, 8 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b8val, ST_Value(rast, 9 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b9val, ST_Value(rast, 10 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b10val, ST_Value(rast, 11 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b11val,ST_Value(rast, 12 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b12val FROM public.wind_potential;", [lat,lng], (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getSolarAtPoint = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    // Gets the wind value based on location... I have to specify each band by hand, PostGIS doc did not have a way to get value from all bands at once.
    pool.query("SELECT ST_Value(rast, 1 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) As b1val ,ST_Value(rast, 2 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b2val, ST_Value(rast, 3 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b3val, ST_Value(rast, 4 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b4val, ST_Value(rast, 5 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b5val, ST_Value(rast, 6 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b6val, ST_Value(rast, 7 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b7val, ST_Value(rast, 8 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b8val, ST_Value(rast, 9 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b9val, ST_Value(rast, 10 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b10val, ST_Value(rast, 11 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b11val,ST_Value(rast, 12 , ST_SetSRID(ST_MakePoint(  $1 , $2 ), 4326)) b12val FROM public.solar_potential;", [lat,lng], (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

/*const getSolarBand1 = (request, response) => {
    //pool.query("SELECT ST_AsPNG(rast, 1) As rastpng FROM public.solar_potential", (error, results) =>{
        pool.query("SELECT ST_AsGDALRaster(rast,'GTiff', ARRAY['COMPRESS=JPEG', 'JPEG_QUALITY=90'], 4269) As rasttiff FROM public.solar_potential WHERE rid=1", (error, results) =>{
        if(error){
            throw error;
        };
        response.json(results.rows);
    });
}*/

module.exports = {
    getSettlements,
    //getSettlementsPop100,
    //getSettlementsPop1000,
    getSettlement,
    getRivers,
    getTownships,
    getGrid,
    getDistricts,
    getCityTown,
    getWindAtPoint,
    getSolarAtPoint
    //getSolarBand1
};