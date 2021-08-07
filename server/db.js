const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'corekit',
    password: 'admin',
    port: 5432,
});

const getSettlements = (request, response) => {
    pool.query('SELECT population, village_hh, name, longitude, latitude FROM public.settlements ORDER BY gid ASC', (error, results) => {
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
    pool.query('SELECT * FROM public.rivers ORDER BY gid ASC', (error, results) => {
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
    pool.query('SELECT * FROM public.townships ORDER BY gid ASC', (error, results) =>{
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