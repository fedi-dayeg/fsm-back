const connection = require('../config/db');

// Constructor
const Maj = function (maj) {
    this.id = maj.id;
    this.titre = maj.titre;
    this.date = maj.date;
    this.descriptions = maj.descriptions;
};

// @desc    Add new Maj to the DB
Maj.AddMaj = (newMaj, result) => {
    connection.query('INSERT INTO maj SET ?', newMaj, (err, res) => {
        if (err) {
            console.log("Error in : ", err);
            result(err, null);
            return;
        }
        console.log("Created Maj: ", {id: res.id, ...newMaj});
        result(null, {id: res.id, ...newMaj});

    });
}

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


// @desc    Delete the Maj From the DB
Maj.deleteMaj = (id, result) => {
    connection.query("DELETE FROM maj where id = ?", id, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Maj with id: ", id);
        result(null, res);
    })
}


// @desc    Update the Maj by Id From the DB
Maj.updateMaj = (id, maj, result) => {
    connection.query("UPDATE maj SET titre = ?, date = ?, descriptions = ? where id = ?",
        [maj.titre, maj.date, maj.descriptions, id],
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
            console.log("update Maj: ", {id: id, ...maj});
            result(null, {id: id, ...maj});
        });
}

Maj.getAllMaj = result => {
    connection.query("SELECT * FROM maj", (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        console.log("Maj: ", res);
        result(null, res);
    })
}

module.exports = Maj;
