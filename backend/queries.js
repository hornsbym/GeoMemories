const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: '$Chloe(1226)',
    port: 5432
})

const getUser = (request, response) => {
    pool.query("SELECT * FROM users WHERE user_id=1", (error, results) => {
        if (error) {
            throw error;
        } else {
            response.status(200).json(results.rows)
        }
    })
}

module.exports = {
    getUser
}