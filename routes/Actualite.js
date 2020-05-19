/*const express = require('express');
const {getActualite} = require('../controllers/Actualite');
const router = express.Router();

router.get("/actualite" ,getActualite);

module.exports = router;*/

module.exports = app => {
    const  actualite = require("../controllers/Actualite");

    // Retrive all Actualité
    app.get("/api/public/actualite", actualite.findAllActualite);
}
