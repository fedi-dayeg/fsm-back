const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const admins = function (admins) {
    this.id = admins.id;
    this.email = admins.email;
    this.password = admins.password;
    this.nom = admins.nom;
    this.prenom = admins.prenom;
};
admins.create = (newAdmin, result) => {
    console.log("okk");
    connection.query('INSERT INTO AdminTable SET ?', newAdmin,   (err, res) => {

        if(err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created Admin ", {id: res.id, ...newAdmin});
        result(null, {id: res.id, ...newAdmin});
    });
};


admins.getAdminByEmail = (email, result) => {
    connection.query('SELECT * FROM AdminTable WHERE email = ?', email, (err, res) => {
        if (err) {
            console.log("error", err);
            /*result({kind: "not_found"}, err);*/
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Admin Found: ", res[0]);
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);

    });
};


admins.verifAdminByEmail = (email, result) => {
    connection.query('SELECT * FROM AdminTable WHERE email = ?', email, (err, res) => {
        if (err) {
            console.log("error", err);
            /*result({kind: "not_found"}, err);*/
            result(null, err);
            return;
        }
        else {
            result(null, res);
        }

    });
};

admins.authentification = (admin, result) => {
    connection.query("SELECT * FROM AdminTable WHERE email = ?", [admins.email], (err, results) => {
        if (err) {
            console.log("error: ", err);
            results(err, null);
        } else {
            let userDatabase = results[0];
            bcrypt.compare(admin.password, userDatabase.email, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res);
                }
            });
        }
    });
};

//Get All Admin
admins.getAll = result => {
    connection.query(`SELECT * FROM AdminTable`, (err, res) => {
        if (err) {
            console.log("ERROR");
            result(null, err);
            return;
        }
        console.log("Admin: ", res);
        result(null, res);
    });
};

// @desc    Delete the Admin From the DB
admins.deleteAdmin = (id, result) => {
    connection.query("DELETE FROM AdminTable where id = ?", id, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Admin with id: ", id);
        result(null, res);
    })
}


// @desc    Upadete the Admin by Id From the DB
admins.updateAdminById = (id, admin, result) => {
    connection.query("UPDATE AdminTable SET email = ?, nom = ?, prenom = ? where id = ?",
        [admin.email, admin.nom, admin.prenom, id],
        (err, res) => {
            if (err) {
                console.log("error",err.message);
                result(null, err);
                return;
            }
            if (res.affectedRows === 0) {
                //not Found Admin with the id
                result({kind: "not_found"}, null);
                return;
            }
            console.log("update Admin: ", {id: id, ...admin});
            result(null, {id: id, ...admin});
        });
}


// @desc    Create the Find by Id Method to Get Admin by her Id
admins.findAdminById = (id, result) => {
    connection.query(`SELECT * FROM AdminTable WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Admin Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Not Found Actualite  with the id
        result({kind: "not Found"}, null);
    })
}

module.exports = admins;
