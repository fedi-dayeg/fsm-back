const authJwt = require("../middleware/authJwt");
module.exports = app => {
    const  maj = require("../controllers/MajController");

    // Retrieve all Maj
    app.get("/api/public/maj", maj.findAllMaj);
    // Retrieve Actualité by Id
    app.get("/api/public/maj/:id", maj.findOne);
    // Retrieve the number of row in table Maj
    app.get("/api/public/majcount", maj.getTotalOfMaj);

    // POST new Maj
    app.post("/api/public/addmaj", [authJwt.verifyToken], maj.postMaj)
    // Delete a Maj with Id
    app.delete("/api/public/deletmaj/:id", maj.deleteMaj);
    //Update Maj by his Id
    app.put("/api/public/updatemaj/:id", maj.updateMaj);

    app.get("/api/public/majs", maj.findAll);
}

