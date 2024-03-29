require('dotenv').config({path: '../.env'});
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PW,
    port: process.env.DATABASE_PORT,
});

// Gets all settlements
const getSettlements = (request, response) => {
    //pool.query(" SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, name, village_hh, population, district, township) As l )) As properties FROM public.settlements As lg ) As f", (error, results) => {
    //pool.query(" SELECT array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, name, village_hh, population, district, township) As l )) As properties FROM public.settlements As lg ) As f", (error, results) => {
    pool.query("SELECT jsonb_build_object('type', 'FeatureCollection', 'features', jsonb_agg(feature)) FROM (SELECT jsonb_build_object('type', 'Feature','gid', gid,'geometry', ST_AsGeoJSON(geom)::jsonb, 'properties', to_jsonb(inputs) - 'gid' - 'geom') AS feature FROM (SELECT * FROM public.settlements) inputs) features;", (error, results) => {
       if (error) {
            throw error;
        }
        const [{ jsonb_build_object : data}] = results.rows;
        response.status(200).json(data);
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

const getNearestSettlement = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    pool.query("SELECT *, ST_Transform(public.settlements.geom, 26918), public.settlements.geom <-> ST_SetSRID(ST_Point($1, $2), 26918)::geometry AS dist FROM public.settlements ORDER BY dist LIMIT 1", [lat,lng], (error, results) => {
        if(error){
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

//Finds the nearest river segment
const getNearestRiver = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    pool.query("SELECT *, ST_Transform(public.rivers.geom, 26918), public.rivers.geom <-> ST_SetSRID(ST_Point($1, $2), 26918)::geometry AS dist FROM public.rivers ORDER BY dist LIMIT 1", [lat,lng], (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
}

const getTownships = (request, response) => {
    pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, ts, ts_mmr4) As l )) As properties FROM public.townships_shan_south As lg ) As f", (error, results) => {
    //pool.query("SELECT row_to_json(fc) AS geojson FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) AS features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geometry, 4326),15,0)::json As geometry, row_to_json((*)) As properties FROM public.townships As lg) As f) As fc", (error, results) =>{
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};

const getTownshipAtPoint = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    // Gets the district based on latitude / longitude.
    pool.query("SELECT * FROM public.townships_shan_south WHERE ST_Within(ST_SetSRID(ST_Point($1, $2), 0), geom::geometry);", [lat,lng], (error, results) => {
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

//Finds the nearest medium voltage grid segment
const getNearestGrid = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    pool.query("SELECT *, ST_Transform(public.medium_voltage_grid.geom, 26918), public.medium_voltage_grid.geom <-> ST_SetSRID(ST_Point($1, $2), 26918)::geometry AS distance FROM public.medium_voltage_grid ORDER BY distance LIMIT 1", [lat,lng], (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
}

const getDistricts = (request, response) => {
    //pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, name_2, varname_2) As l )) As properties FROM public.districts As lg ) As f", (error, results) => {
    pool.query("SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(geom)::json As geometry, row_to_json((SELECT l FROM (SELECT gid, dt, dt_mmr4 ) As l )) As properties FROM public.districts_shan_south As lg ) As f", (error, results) => {
        if(error){
            throw error;
        };
        response.status(200).json(results.rows);
    });
};
const getDistrictAtPoint = (request, response) => {
    const lat = parseFloat(request.params.lat);
    const lng = parseFloat(request.params.lng);
    // Gets the district based on latitude / longitude.
    pool.query("SELECT * FROM public.districts_shan_south WHERE ST_Within(ST_SetSRID(ST_Point($1 , $2), 0), geom::geometry);", [lat,lng], (error, results) => {
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

/*const getWindRaster = (request, response) => {
    //pool.query("SELECT ST_AsPNG(rast, 1) As rastpng FROM public.solar_potential", (error, results) =>{
        pool.query("SELECT ST_AsGDALRaster(rast, 'GTiff', ARRAY['COMPRESS=LZW']) as tiff FROM public.wind_potential WHERE rid = 1", (error, results) =>{
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
    getTownshipAtPoint,
    getGrid,
    getDistricts,
    getDistrictAtPoint,
    getCityTown,
    getWindAtPoint,
    getSolarAtPoint,
    //getWindRaster
    getNearestRiver,
    getNearestSettlement,
    getNearestGrid
};