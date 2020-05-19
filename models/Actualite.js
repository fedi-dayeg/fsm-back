const connection = require('../config/db');

// Constructor
const Actualite = function (actualite) {
    this.id = actualite.id;
    this.titre = actualite.titre;
    this.date = actualite.date;
    this.description = actualite.description;
};


Actualite.getAll =  result => {
    connection.query(`SELECT * FROM actualite ORDER BY id DESC LIMIT 10`, (err, res) => {
        if (err) {
            console.log("ERROR");
            result (null, err);
            return;
        }
        console.log("Actualite: ", res);
        result(null, res);
    });
};

module.exports = Actualite;
