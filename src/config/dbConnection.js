const mysql = require ('mysql2');

module.exports = ()=> {
    return mysql.createConnection({
host: 'localhost',
user: 'root',
password: '1234',
database: 'crud_libreria'
});
};