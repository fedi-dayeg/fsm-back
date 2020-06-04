const connection = require('../config/db');

// Constructor
const Actualite = function (actualite) {
    this.id = actualite.id;
    this.titre = actualite.titre;
    this.date = actualite.date;
    this.description = actualite.description;
};

// @desc    Create the GetAll Method to Get All the Actualité
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

// @desc    Create the Find by Id Method to Get Actualité by her Id
Actualite.findById = (id, result) => {
    connection.query(`SELECT * FROM actualite WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("Actualite Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Not Found Actualite  with the id
        result({kind: "not Found"}, null);
    })
}

// @desc    Get the Number of the Actulaite in the DB
Actualite.getTotalActualite = result => {
    connection.query("SELECT COUNT(*) as actualiteCount FROM actualite", (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        console.log("Actualite : ", res);
        result(null, res)
    })
}

module.exports = Actualite;
