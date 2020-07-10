const connection = require('../config/db');
const bcrypt = require('bcryptjs');
/*const saltRound = 10;

//Etudiants Constructor
const Etudiants = function (etudiants) {
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
    this.create_date = etudiants.create_date;
    this.last_update = etudiants.last_update;
};
Etudiants.createEtudiants =  (newEtudiants, result) => {
    // Insert Into etudiants
    bcrypt.hashSync(newEtudiants.password, saltRound, function (err, hash) {
        console.log(hash);
        connection.query("INSERT INTO etudiant(nom, prenom, cin, etat, grade, dateInscription, email, password, etablissement, universite, create_date, last_update) values (?,?,?,?,?,?,?,?,?,?,?,?)",
            [newEtudiants.nom,newEtudiants.prenom, newEtudiants.cin,newEtudiants.etat,newEtudiants.grade, newEtudiants.dateInscription, newEtudiants.email,hash,newEtudiants.etablissement, newEtudiants.universite, newEtudiants.create_date, newEtudiants.last_update],  (err, res) => {
            if (err) {
                console.log("error", err);
                result(err, null);
                return;
            } else {
                console.log("Insertion effectuer avec succès, l'id de l'insertion est : ", res.id);
                result(null, res.id);
            }
            });
    });
};

Etudiants.getEtudiantsById =  (etudiantId, result) => {
    connection.query("SELECT * FROM etudiant WHERE id = ?", etudiantId, function (err, res) {
        if (err) {
            console.log("error", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Etudiants.getEtudiantByEmail = function(etudiantEmail, result) {
    connection.query("SELECT * FROM etudiant where email = ?",etudiantEmail, function (err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Etudiants;*/

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
    this.create_date = etudiants.create_date;
    this.last_update = etudiants.last_update;
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
    connection.query('SELECT * FROM etudiant WHERE email = ?',email,  (err, res) => {
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
module.exports = etudiants;
