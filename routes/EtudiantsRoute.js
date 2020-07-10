module.exports = app => {
    const  etudiants = require("../controllers/EtudiantsController");

    app.post("/api/public/etudiants", etudiants.create);
    app.post("/api/public/etudiants/login", etudiants.login);
}
