module.exports = app => {
    const item = require("../controllers/imagenes.controller");


    const multipart = require("connect-multiparty");
    const multipartMiddleware = multipart({
        uploadDir: "./uploads"
    });
    // Create a new Customer
    app.post("/imagenes", item.create);

    // Retrieve all Customers
    app.get("/imagenes", item.findAll);

    // Retrieve a single Customer with customerId
    app.get("/imagenes/:id", item.findOne);

    // Retrieve a single Customer with customerId
    app.get("/imagenes/archivo/:fileName", multipartMiddleware, item.getOnePhoto); //muestra una foto
    // Update a Customer with customerId
    app.put("/imagenes/:id", item.update);

    // Delete a Customer with customerId
    app.delete("/imagenes/:id", item.delete);



};