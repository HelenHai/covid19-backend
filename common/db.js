const mysql = require('mysql')

// connect to database
let config = {
    host: 'localhost',
    user: 'root',
    database: 'covid19',
    port: 3306,
    password: 'qpalzmhx'
}
const conn = mysql.createPool(config)

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        conn.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // release the connection
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    query
}