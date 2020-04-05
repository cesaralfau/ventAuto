module.exports = app => {
    const item = require("../controllers/imagenes.controller");

    // Create a new Customer
    app.post("/imagenes", item.create);

    // Retrieve all Customers
    app.get("/imagenes", item.findAll);

    // Retrieve a single Customer with customerId
    app.get("/imagenes/:id", item.findOne);

    // Update a Customer with customerId
    app.put("/imagenes/:id", item.update);

    // Delete a Customer with customerId
    app.delete("/imagenes/:id", item.delete);



};