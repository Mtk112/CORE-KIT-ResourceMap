const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'corekit',
    password: 'admin',
    port: 5432,
})

const getSettlements = (request, response) => {
    pool.query('SELECT * FROM public.settlements ORDER BY gid ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getSettlementInfoByCoords = (request, response) => {
    const lat = parseFloat(request.params.lat)
    const lng = parseFloat(request.params.lng)
    const id = parseInt(request.params.id)
    pool.query('SELECT population, village_hh, name FROM public.settlements WHERE gid = $1', [id], (error, results) =>{
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getSettlements,
    getSettlementInfoByCoords,
}