const Item = require("../models/marcamodelo.model");

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Peticion no puede estar vacia!."
        });
    }

    // Create a Customer

    const item_ = new Item({
        marca: req.body.marca,
        modelo: req.body.modelo,
    });

    // Save Item in the database
    Item.create(item_, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al insertar nueva marcamodelo."
            });
        else res.send(data);
    });
};

// Retrieve all Usuarios from the database.
exports.findAll = (req, res) => {
    Item.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salio mal buscando todas las marcamodelo."
            });
        else res.send(data);
    });
};

// Find a single Item with a UsuarioId
exports.findOne = (req, res) => {
    Item.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro marcamodelo con el id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error en la busqueda de marcamodelo por id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Item identified by the UsuarioId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Peticion no puede estar vacia!"
        });
    }
    const item_ = new Item({
        marca: req.body.marca,
        modelo: req.body.modelo,

    });

    Item.updateById(req.params.id, item_, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro marcamodelo con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error actualizando marcamodelo" + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Delete a Item with the specified UsuarioId in the request
exports.delete = (req, res) => {
    Item.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encuentra marcamodelo con id:  ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "No se pudo borrar la marcamodelo con el id: " + req.params.id
                });
            }
        } else res.send({ message: `MarcaModelo borrada correctamente!` });
    });
};