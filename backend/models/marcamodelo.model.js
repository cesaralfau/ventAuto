const sql = require("../config/connection");

// constructor
const Item = function(item_) {
    this.marca = item_.marca;
    this.modelo = item_.modelo;
};

Item.create = (nuevo_body, result) => {
    sql.query("INSERT INTO marcamodelo SET ?", nuevo_body, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...nuevo_body });
    });
};

Item.findById = (id, result) => {
    sql.query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Item with the id
        result({ kind: "not_found" }, null);
    });
};

Item.getAll = result => {
    sql.query("SELECT * FROM marcamodelo", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Item.updateById = (id, body, result) => {
    sql.query(
        "UPDATE marcamodelo  SET ? WHERE id_marcamodelo = ?", [body, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Item with the id
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...body });
        }
    );
};

Item.remove = (id, result) => {
    sql.query("DELETE FROM marcamodelo WHERE id_marcamodelo = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Item with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};


module.exports = Item;