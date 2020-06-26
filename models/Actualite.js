const connection = require('../config/db');

// Constructor
const Actualite = function (actualite) {
    this.id = actualite.id;
    this.titre = actualite.titre;
    this.date = actualite.date;
    this.description = actualite.description;
};

// @desc    Create the AddActualite Method to Add new Actualité
Actualite.AddActualite = (newActualite, result) => {
    connection.query('INSERT INTO actualite SET ?', newActualite, (err, res) => {
        if (err) {
            console.log("Error in : ", err);
            result(err, null);
            return;
        }
            console.log("Created Actualite: ", {id: res.id, ...newActualite});
            result(null, {id: res.id, ...newActualite});

    });
}


// @desc    Create the GetAll Method to Get All the Actualité
Actualite.getAll = result => {
    connection.query(`SELECT * FROM actualite ORDER BY id DESC LIMIT 10`, (err, res) => {
        if (err) {
            console.log("ERROR");
            result(null, err);
            return;
        }
        console.log("Actualite: ", res);
        result(null, res);
    });
};

// @desc    Create the GetAll Method to Get All the Actualité
Actualite.getAllAct = result => {
    connection.query(`SELECT * FROM actualite ORDER BY id`, (err, res) => {
        if (err) {
            console.log("ERROR");
            result(null, err);
            return;
        }
        console.log("Actualite: ", res);
        result(null, res);
    });
};

// @desc    Create the Find by Id Method to Get Actualité by her Id
Actualite.findById = (id, result) => {
    connection.query(`SELECT * FROM actualite WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if (res.length) {
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

// @desc    Delete the Actulaite From the DB
Actualite.deleteActualite = (id, result) => {
    connection.query("DELETE FROM actualite where id = ?", id, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Actualite with id: ", id);
        result(null, res);
    })
}

// @desc    Upadete the Actulaite by Id From the DB
Actualite.updateActualiteById = (id, actualite, result) => {
    connection.query("UPDATE actualite SET titre = ?, date = ?, description = ? where id = ?",
        [actualite.titre, actualite.date, actualite.description, id],
        (err, res) => {
        if (err) {
            console.log("error",err.message);
            result(null, err);
            return;
        }
        if (res.affectedRows === 0) {
            //not Found Actualite with the id
            result({kind: "not_found"}, null);
            return;
        }
        console.log("update Actualite: ", {id: id, ...actualite});
        result(null, {id: id, ...actualite});
        });
}

module.exports = Actualite;
