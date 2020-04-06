const sql = require("../config/connection");

// constructor
const Usuario = function (usuario) {
    this.correo_user = usuario.correo_user;
    this.nom_user = usuario.nom_user;
    this.telef_user = usuario.telef_user;
    this.resid_user = usuario.resid_user;
    this.passw_user = usuario.passw_user;
};

Usuario.create = (nuevo_usuario, result) => {
    sql.query("INSERT INTO usuarios SET ?", nuevo_usuario, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...nuevo_usuario });
    });
};

Usuario.login = (user, result) => {
    sql.query(`select * from usuarios where correo_user = '${user.correo_user}' AND passw_user = '${user.passw_user}' limit 1`, (err, res) => {

        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Usuario with the id
        result({ kind: "not_found" }, null);
    });
};

Usuario.isLogin = (user, result) => {
    sql.query(`select * from usuarios where correo_user = '${user.correo_user}' AND passw_user = '${user.passw_user}' limit 1`, (err, res) => {

        if (err) {
            console.error("error: ", err);
            result(err, false);
            return;
        }

        if (res.length) {
            result(null, true);
            return;
        }

        // not found Usuario with the id
        result(null, false);
    });
};

Usuario.findById = (id, result) => {
    sql.query(`SELECT * FROM usuarios WHERE id_user = ${id}`, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {

            result(null, res[0]);
            return;
        }

        // not found Usuario with the id
        result({ kind: "not_found" }, null);
    });
};

Usuario.getAll = result => {
    sql.query("SELECT * FROM usuarios", (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Usuario.updateById = (id, usuario, result) => {
    sql.query(
        "UPDATE usuarios  SET ? WHERE id_user = ?", [usuario, id],
        (err, res) => {
            if (err) {
                console.error("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Usuario with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...usuario });
        }
    );
};

Usuario.remove = (id, result) => {
    sql.query("DELETE FROM usuarios WHERE id_user = ?", id, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Usuario with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.error("deleted customer with id: ", id);
        result(null, res);
    });
};


module.exports = Usuario;