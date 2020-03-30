module.exports = app => {
    const item = require("../controllers/marcamodelo.controller");

    // Create a new Customer
    app.post("/marcamodelo", item.create);

    // Retrieve all Customers
    app.get("/marcamodelo", item.findAll);

    // Retrieve a single Customer with customerId
    app.get("/marcamodelo/:id", item.findOne);

    // Update a Customer with customerId
    app.put("/marcamodelo/:id", item.update);

    // Delete a Customer with customerId
    app.delete("/marcamodelo/:id", item.delete);

};