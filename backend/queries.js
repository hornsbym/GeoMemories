const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '$Chloe(1226)',
    port: 5432
})

const getUser = (request, response) => {
    var uname = request.query.username;
    pool.query(`SELECT * FROM users WHERE username='${uname}'`, (error, results) => {
        if (error) {
            throw error;
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getMemoriesForUser = (request, response) => {
    var uname = request.query.username;
    pool.query(`SELECT lat, long, title, descr FROM users, memory_info WHERE username='${uname}'`, (error, results) => {
        if (error) {
            throw error;
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const addMemoryForUser = (request, response) => {
    var uname = request.query.username;
    var title = request.query.title;
    var lat  = request.query.latitude;
    var long = request.query.longitude;
    var desc = request.query.description;

    pool.query(`INSERT INTO memory_info (lat, long, title, descr, user_id) 
    VALUES (${lat}, ${long}, '${title}', '${desc}', (SELECT user_id FROM users WHERE username='${user_id}'))`, (error, results) => {
        if (error) {
            throw error;
        } else {
            response.status(200)
        }
    })
}

module.exports = {
    getUser,
    getMemoriesForUser
}