module.exports = app => {
    const  superAdmin = require("../controllers/SuperAdminController");

    app.post("/api/public/superadmin", superAdmin.create);
        app.post("/api/public/superadmin/login", superAdmin.login);
}
