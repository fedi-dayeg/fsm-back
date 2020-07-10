const connection = require('../config/db');

// Constructor
const Manifestations = function (manifestations) {
    this.id = manifestations.id;
    this.titre = manifestations.titre;
    this.date = manifestations.date;
    this.description = manifestations.description;
}

// @desc    CAdd new Manifestation to the DB
Manifestations.AddManifestation = (newManifestation, result) => {
    connection.query('INSERT INTO manifestations SET ?', newManifestation, (err, res) => {
        if (err) {
            console.log("Error in : ", err);
            result(err, null);
            return;
        }
        console.log("Created Manifestation: ", {id: res.id, ...newManifestation});
        result(null, {id: res.id, ...newManifestation});

    });
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

// @desc    Create the GetTitre Method to Get Titre of  Manifestation
Manifestations.getTitre = result => {
    connection.query("SELECT * FROM manifestations", (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        console.log("Manifestation: ", res);
        result(null, res)
    })
}

// @desc    Create the FindById Method to Get Manifestation by her Id
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

        // Not Found Manifestation with the id
        result({kind: "not Found"}, null);

    })
}

// @desc    Get the number Of the manifestations in the DB
Manifestations.getTotalManifestations = result => {
    connection.query("SELECT COUNT(*) as manifestationCount FROM manifestations", (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        console.log("Manifestation : ", res);
        result(null, res)
    })
}


// @desc    Delete the Manifestation From the DB
Manifestations.deleteManifestation = (id, result) => {
    connection.query("DELETE FROM manifestations where id = ?", id, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Manifestation with id: ", id);
        result(null, res);
    })
}

// @desc    Upadete the Manifestation by Id From the DB
Manifestations.updateManifestationById = (id, manifestations, result) => {
    connection.query("UPDATE manifestations SET titre = ?, date = ?, description = ? where id = ?",
        [manifestations.titre, manifestations.date, manifestations.description, id],
        (err, res) => {
            if (err) {
                console.log("error",err.message);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                //not Found Manifestation with the id
                result({kind: "not_found"}, null);
                return;
            }
            console.log("update Manifestation: ", {id: id, ...manifestations});
            result(null, {id: id, ...manifestations});
        });
}

module.exports = Manifestations;
