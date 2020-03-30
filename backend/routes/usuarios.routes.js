module.exports = app => {
    const usuarios_ = require("../controllers/user.controller");

    // login
    app.post("/login", usuarios_.login);

    // is logIn
    app.post("/isLogin", usuarios_.isLogin);

    // Create a new Customer
    app.post("/usuarios", usuarios_.create);

    // Retrieve all Customers
    app.get("/usuarios", usuarios_.findAll);

    // Retrieve a single Customer with customerId
    app.get("/usuarios/:id", usuarios_.findOne);

    // Update a Customer with customerId
    app.put("/usuarios/:id", usuarios_.update);

    // Delete a Customer with customerId
    app.delete("/usuarios/:id", usuarios_.delete);

};