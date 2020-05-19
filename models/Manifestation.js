const connection = require('../config/db');

// Constructor
const Manifestations = function (manifestations) {
    this.id = manifestations.id;
    this.titre = manifestations.titre;
    this.date = manifestations.date;
    this.description = manifestations.description;
}

// @desc    Create the Get Method to Get all the Manifestation
Manifestations.getAll = result => {
    connection.query("SELECT * FROM manifestations", (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        console.log("Manifestation: ", res);
        result(null, res);
    })
}

Manifestations.getTitre = result => {
    connection.query("SELECT titre, id FROM manifestations", (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        console.log("Manifestation: ", res);
        result(null, res)
    })
}

Manifestations.findById = (id, result) => {
    connection.query(`SELECT * FROM manifestations WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("Manifestation Found: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Not Found Customer with the id
        result({kind: "not Found"}, null);

    })
}

module.exports = Manifestations;
