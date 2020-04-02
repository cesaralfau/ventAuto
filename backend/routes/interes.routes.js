module.exports = app => {
    const item = require("../controllers/interes.controller");

    // Create a new Customer
    app.post("/interes", item.create);

    // Retrieve all Customers
    app.get("/interes", item.findAll);

    // Retrieve a single Customer with customerId
    app.get("/interes/:id", item.findOne);

    // Update a Customer with customerId
    app.put("/interes/:id", item.update);

    // Delete a Customer with customerId
    app.delete("/interes/:id", item.delete);



};