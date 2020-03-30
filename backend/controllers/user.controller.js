const Usuario = require("../models/user.model");

// Create and Save a new Usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Peticion no puede estar vacia!."
        });
    }

    // Create a Customer

    const usuario = new Usuario({
        correo_user: req.body.correo_user,
        nom_user: req.body.nom_user,
        telef_user: req.body.telef_user,
        resid_user: req.body.resid_user,
        passw_user: req.body.passw_user,
    });

    // Save Usuario in the database
    Usuario.create(usuario, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

// Retrieve all Usuarios from the database.
exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Peticion no puede estar vacia!."
        });
    }
    const sesion = {
        correo_user: req.body.correo_user,
        passw_user: req.body.passw_user,
    };

    Usuario.login(sesion, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salio mal en el login"
            });
        else res.send(data);
    });
};

exports.isLogin = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Peticion no puede estar vacia!."
        });
    }
    const sesion = {
        correo_user: req.body.correo_user,
        passw_user: req.body.passw_user,
    };

    Usuario.isLogin(sesion, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salio mal revisando la sesion."
            });
        else res.send(data);
    });
};

// Retrieve all Usuarios from the database.
exports.findAll = (req, res) => {
    Usuario.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo salio mal buscando los usuarios."
            });
        else res.send(data);
    });
};

// Find a single Usuario with a UsuarioId
exports.findOne = (req, res) => {
    Usuario.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Usuario identified by the UsuarioId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Peticion no puede estar vacia!"
        });
    }
    const usuario = new Usuario({
        correo_user: req.body.correo_user,
        nom_user: req.body.nom_user,
        telef_user: req.body.telef_user,
        resid_user: req.body.resid_user,
        passw_user: req.body.passw_user,
    });

    Usuario.updateById(req.params.id, usuario, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Customer with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Delete a Usuario with the specified UsuarioId in the request
exports.delete = (req, res) => {
    Usuario.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encuentra usuario con id:  ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "No se pudo borrar el usuario con el id: " + req.params.id
                });
            }
        } else res.send({ message: `Usuario borrado correctamente!` });
    });
};