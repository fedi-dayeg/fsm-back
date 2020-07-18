const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const etudiants = function (etudiants) {
    this.id = etudiants.id;
    this.nom = etudiants.nom;
    this.prenom = etudiants.prenom;
    this.cin = etudiants.cin;
    this.etat = etudiants.etat;
    this.grade = etudiants.grade;
    this.dateInscription = etudiants.dateInscription;
    this.email = etudiants.email;
    this.password = etudiants.password;
    this.etablissement = etudiants.etablissement;
    this.universite = etudiants.universite;
    this.activate = etudiants.activate;
};
etudiants.create = (newEtudiant, result) => {
    connection.query("INSERT INTO etudiant SET ?", newEtudiant, (err, res) => {
        if(err) {
            console.log("error" , err);
            result(err, null);
            return;
        }
        console.log("created Etudiant ", {id: res.insertId, ...newEtudiant});
        result(null, {etudiants: {id: res.insertId, ...newEtudiant}});
    });
};

etudiants.getEtudiantByEmail = (email, result) => {
    connection.query('SELECT * FROM etudiant WHERE email = ? AND activate = 1',email,  (err, res) => {
        if (err) {
            console.log("error", err);
            result({ kind: "not_found" }, err);
            return;
        }
        if (res.length) {
            console.log("Etudiant Found: ", res[0]);
            result(null, res);
            return;
        }
        result({kind: "not Found"}, null);

    });
};



etudiants.authentification = (etudiants,result) =>{
    connection.query("SELECT * FROM etudiant WHERE email = ?",[etudiants.email], (err,results) =>{
        if (err){
            console.log("error: ",err);
            results(err,null);
        } else {
            let userDatabase = results[0];
            bcrypt.compare(etudiants.password,userDatabase.email, (err,res) => {
                if (err){
                    console.log("error: ",err);
                    result(err,null);
                } else {
                    result(null,res);
                }
            });
        }
    });
};

etudiants.verifEtudiantByEmail = (email, result) => {
    connection.query('SELECT * FROM etudiant WHERE email = ?', email, (err, res) => {
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

//Get All Etudiants
etudiants.getAll = result => {
    connection.query(`SELECT * FROM etudiant`, (err, res) => {
        if (err) {
            console.log("ERROR");
            result(null, err);
            return;
        }
        console.log("Etudiant: ", res);
        result(null, res);
    });
};


// @desc    Delete the Etudiants From the DB
etudiants.deleteEtudiants = (id, result) => {
    connection.query("DELETE FROM etudiant where id = ?", id, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted Etudiants with id: ", id);
        result(null, res);
    })
}


// @desc    Upadete the Etudiants by Id From the DB
etudiants.updateEtudiantById = (id, etudiants, result) => {
    connection.query("UPDATE etudiant SET nom = ?, prenom = ?, cin = ?, etat = ?, grade = ?, dateInscription = ?, email = ?, etablissement = ?, universite = ? where id = ?",
        [etudiants.nom, etudiants.prenom, etudiants.cin, etudiants.etat, etudiants.grade, etudiants.dateInscription, etudiants.email, etudiants.etablissement, etudiants.universite, id],
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
            console.log("update Etudiants: ", {id: id, ...etudiants});
            result(null, {id: id, ...etudiants});
        });
}



// @desc    Create the Find by Id Method to Get Admin by her Id
etudiants.findEtudiantsById = (id, result) => {
    connection.query(`SELECT * FROM etudiant WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Etudiants Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Not Found Etudiants  with the id
        result({kind: "not Found"}, null);
    })
}


// @desc    Upadete the Etudiants by Id From the DB
etudiants.updateEtudiantActive = (id, result) => {
    connection.query("UPDATE etudiant SET activate = 1 where id = ?",
        [id],
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
            console.log("update Etudiants: ", {id: id, ...etudiants});
            result(null, res);
        });
}


module.exports = etudiants;
