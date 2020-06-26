const connection = require('../config/db');

// Constructor
const Maj = function (maj) {
    this.id = maj.id;
    this.titre = maj.titre;
    this.date = maj.date;
    this.description = maj.description;
};

// @desc    Create the GetAll Method to Get All the Maj
Maj.getAll =  result => {
    connection.query(`SELECT * FROM maj ORDER BY id DESC LIMIT 5`, (err, res) => {
        if (err) {
            console.log("ERROR");
            result (null, err);
            return;
        }
        console.log("Maj: ", res);
        result(null, res);
    });
};

// @desc    Create the Find by Id Method to Get Maj by her Id
Maj.findById = (id, result) => {
    connection.query(`SELECT * FROM maj WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("Maj Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Not Found Maj  with the id
        result({kind: "not Found"}, null);
    })
}

// @desc    Get the Number of the Maj in the DB
Maj.getTotalMaj = result => {
    connection.query("SELECT COUNT(*) as majCount FROM maj", (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        console.log("Maj : ", res);
        result(null, res)
    })
}

module.exports = Maj;
