const mysql = require("mysql");
const dbConfig = require("./db");

//creacion de conexion a la base de datos
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//abrir conexion sql
connection.connect(error => {
    if (error) throw error;
    console.log("Base de datos conectada correctamente.");
});

module.exports = connection;