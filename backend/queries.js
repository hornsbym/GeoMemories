const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432
})

const getUser = (request, response) => {
    uname = request.query.username;
    pool.query(`SELECT * FROM users WHERE username='${uname}'`, (error, results) => {
        if (error) {
            throw error;
        } else {
            response.status(200).json(results.rows)
        }
    })
}

// const getMemoriesForUser = (request, response) => 

module.exports = {
    getUser
}