module.exports = app => {
    const item = require("../controllers/catalogo.controller");

    const multipart = require("connect-multiparty");
    const multipartMiddleware = multipart({
        uploadDir: "./uploads"
    });
    // Create a new Customer
    app.post("/catalogo", multipartMiddleware, item.create);

    // Retrieve all Customers
    app.get("/catalogo", item.findAll);

    // Retrieve a single Customer with customerId
    app.get("/catalogo/:id", item.findOne);

    // Update a Customer with customerId
    app.put("/catalogo/:id", item.update);

    // Delete a Customer with customerId
    app.delete("/catalogo/:id", item.delete);

    //Buscar Vehiculo
    app.get("/catalogo/:id_marcamodelo/:desde/:hasta/:estado", item.searchAll)

};