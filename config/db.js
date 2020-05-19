const mysql = require('mysql');
const  dbConfig = require('./config')
/*const connectDB = async () => {
    const connection = await mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    });
    connection.connect((err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`Connection Established at ${process.env.HOST}`);
    })
};*/
const connection = mysql.createPool({
    host:dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})
module.exports = connection;
