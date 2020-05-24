module.exports = app => {
    const  maj = require("../controllers/MajController");

    // Retrieve all Maj
    app.get("/api/public/maj", maj.findAllMaj);
    // Retrieve Actualité by Id
    app.get("/api/public/maj/:id", maj.findOne);
}

