let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    database: 'examendb',
    user: 'root',
    password: '12345'
})

connection.connect((err) => {
    if(err){
        console.error('Error conectando a la base de datos: ',err);
        return;
    }
    console.log("Conectado a la base de datos correctamente");
})

module.exports = connection;