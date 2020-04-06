const Item = require("../models/interes.model");

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
        id_catal: req.body.id_catal,
        id_user: req.body.id_user,
        nombre_no_registrado: req.body.nombre_no_registrado,
        correo_no_registrado: req.body.correo_no_registrado,
        telef_no_registrado: req.body.telef_no_registrado
    });

    // Save Item in the database
    Item.create(item_, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al insertar en interes."
            });
        else res.send(data);
    });
};

// Retrieve all Usuarios from the database.
exports.findAll = async (req, res) => {
    await Item.getAll(async (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salio mal buscando los items del interes."
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
                    message: `No se encontro item en el interes con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al encontrar item en el interes con id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.searchAll = (req, res) => {

    Item.searchAll(req.params.id_marcamodelo, req.params.desde, req.params.hasta, req.params.estado, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro item en el interes con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al encontrar item en el interes con id " + req.params.id
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
        id_catal: req.body.id_catal,
        id_user: req.body.id_user,
        nombre_no_registrado: req.body.nombre_no_registrado,
        correo_no_registrado: req.body.correo_no_registrado,
        telef_no_registrado: req.body.telef_no_registrado
    });

    Item.updateById(req.params.id, item_, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro item en el interes con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al actualizar item en el interes con id " + req.params.id
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
                    message: `No se encontro item del interes con id:  ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "No se pudo borrar el item del interes con el id: " + req.params.id
                });
            }
        } else res.send({ message: `Item borrado correctamente del interes!` });
    });
};