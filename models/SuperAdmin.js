const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const superadmins = function (superadmins) {
    this.id = superadmins.id;
    this.email = superadmins.email;
    this.password = superadmins.password;
    this.nom = superadmins.nom;
    this.prenom = superadmins.prenom;
};


superadmins.create = (newSuperAdmin, result) => {
    connection.query('INSERT INTO superadmin SET ?', newSuperAdmin, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created Super Admin ", {id: res.id, ...newSuperAdmin});
        result(null, {id: res.id, ...newSuperAdmin});
    });
};

// authentification of the super admin
superadmins.authentification = (superadmins, result) => {
    connection.query("SELECT * FROM superadmin WHERE email = ?", [superadmins.email], (err, results) => {
        if (err) {
            console.log("error: ", err);
            results(err, null);
        } else {
            let userDatabase = results[0];
            bcrypt.compare(superadmins.password, userDatabase.email, (err, res) => {
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


// verif if the email of the super admin exist or not
superadmins.verifSuperAdminByEmail = (email, result) => {
    connection.query('SELECT * FROM superadmin WHERE email = ?', email, (err, res) => {
        if (err) {
            console.log("error", err);
            /*result({kind: "not_found"}, err);*/
            result(null, err);
            return;
        } else {
            result(null, res);
        }

    });
};

// Get Super Admin by Email
superadmins.getSuperAdminByEmail = (email, result) => {
    connection.query('SELECT * FROM superadmin WHERE email = ?', email, (err, res) => {
        if (err) {
            console.log("error", err);
            /*result({kind: "not_found"}, err);*/
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Super Admin Found: ", res[0]);
            result(null, res);
            return;
        }
        result({kind: "not Found"}, null);

    });
};

module.exports = superadmins;
