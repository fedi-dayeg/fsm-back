module.exports = app => {
    const  admin = require("../controllers/AdminController");

    app.post("/api/public/admin", admin.create);
    app.post("/api/public/admin/login", admin.login);
    // get All the Admin
    app.get("/api/public/getadmin", admin.findAllAdmin);
    // Delete a Admin with Id
    app.delete("/api/public/admin/delete/:id", admin.deleteAdmin);
    //Update Admin by his Id
    app.put("/api/public/update/admin/:id", admin.updateAdmin);
    // Retrieve Admin by Id
    app.get("/api/public/admin/:id", admin.findAdmin);
}
