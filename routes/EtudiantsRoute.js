module.exports = app => {
    const  etudiants = require("../controllers/EtudiantsController");

    app.post("/api/public/etudiants", etudiants.create);
    app.post("/api/public/etudiants/login", etudiants.login);
    //Update Etudiants Active by his Id
    app.put("/api/public/update/etudiant/:id", etudiants.updateEtudiantActive);
    // get All the Etudiants
    app.get("/api/public/etudiant/getall", etudiants.findAllEtudiants);
    // Delete a Etudiants with Id
    app.delete("/api/public/etudiant/delete/:id", etudiants.deleteEtudiants);
    //Update Etudiants by his Id
    app.put("/api/public/update/etudiant/:id", etudiants.updateEtudiantById);
    // Retrieve Etudiants by Id
    app.get("/api/public/etudiant/:id", etudiants.findEtudiants);
}
