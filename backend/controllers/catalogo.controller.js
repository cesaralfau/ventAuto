const Item = require("../models/catalogo.model");

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
        anio_catal: req.body.anio_catal,
        cilind_catal: req.body.cilind_catal,
        color_catal: req.body.color_catal,
        estado_catal: req.body.estado_catal,
        id_marcamodelo: req.body.id_marcamodelo,
        id_user: req.body.id_user,
        inter_catal: req.body.inter_catal,
        precio_catal: req.body.precio_catal,
        trans_catal: req.body.trans_catal,

    });

    // Save Item in the database
    Item.create(item_, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al insertar en el catalogo."
            });
        else res.send(data);
    });
};

// Retrieve all Usuarios from the database.
exports.findAll = async(req, res) => {
    await Item.getAll(async(err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salio mal buscando los items del catalogo."
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
                    message: `No se encontro item en el catalogo con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al encontrar item en el catalogo con id " + req.params.id
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
        anio_catal: req.body.anio_catal,
        cilind_catal: req.body.cilind_catal,
        color_catal: req.body.color_catal,
        estado_catal: req.body.estado_catal,
        id_marcamodelo: req.body.id_marcamodelo,
        id_user: req.body.id_user,
        inter_catal: req.body.inter_catal,
        precio_catal: req.body.precio_catal,
        trans_catal: req.body.trans_catal,
    });

    Item.updateById(req.params.id, item_, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro item en el catalogo con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al actualizar item en el catalogo con id " + req.params.id
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
                    message: `No se encontro item del catalogo con id:  ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "No se pudo borrar el item del catalogo con el id: " + req.params.id
                });
            }
        } else res.send({ message: `Item borrado correctamente del catalogo!` });
    });
};