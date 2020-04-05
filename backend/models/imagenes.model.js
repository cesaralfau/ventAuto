const sql = require("../config/connection");
const util = require('util');
const _ = require('lodash');
// const Usuario = require("../models/user.model");
// const Catalogo = require("./models/catalogo.model")


// constructor
const Item = function(item_) {
    this.id_catal = req.body.id_catal;
    this.fileName = req.body.fileName;
};

Item.create = (nuevo_body, result) => {
    sql.query("INSERT INTO imagenes SET ?", nuevo_body, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...nuevo_body });
    });
};



Item.findById = (id, result) => {
    const query = util.promisify(sql.query).bind(sql);
    (async() => {
        try {
            const row = await query(`SELECT * FROM imagenes WHERE id_interes = ${id}`);
            // const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${ row[0].id_marcamodelo}`);
            const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${ row[0].id_user}`)
            row[0].marcamodelo = marca_modelo[0]
            row[0].usuario = usuario_[0]
            result(null, row[0]);
        } finally {
            query.end();
        }
    })()
};

// Item.searchAll = (id_marcamodelo, desde, hasta, estado, result) => {
//     const query = util.promisify(sql.query).bind(sql);
//     (async() => {
//         try {
//             const imagenes = []
//             const rows = await query(`SELECT * FROM imagenes WHERE id_marcamodelo = ${id_marcamodelo} AND estado_catal = '${estado}' AND anio_catal BETWEEN ${desde} AND ${hasta}`);
//             for (let i = 0; i < rows.length; i++) {
//                 const element = rows[i];
//                 const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${ element.id_marcamodelo}`);
//                 const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${ element.id_user}`);
//                 element.marcamodelo = marca_modelo[0]
//                 element.usuario = usuario_[0]
//                 imagenes.push(element)
//             }
//             result(null, imagenes);
//         } finally {
//             query.end();
//         }
//     })()
// };


// Item.getAll = async result => {

//     const query = util.promisify(sql.query).bind(sql);
//     (async() => {
//         try {
//             const imagenes = []
//             const rows = await query('select * from imagenes');
//             for (let i = 0; i < rows.length; i++) {
//                 const element = rows[i];
//                 const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${ element.id_marcamodelo}`);
//                 const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${ element.id_user}`);
//                 element.marcamodelo = marca_modelo[0]
//                 element.usuario = usuario_[0]
//                 imagenes.push(element)
//             }

//             result(null, imagenes);
//         } finally {
//             query.end();
//         }
//     })()
// };

// Item.updateById = (id, body, result) => {
//     sql.query(
//         "UPDATE imagenes  SET ? WHERE id_catal = ?", [body, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Item with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }
//             result(null, { id: id, ...body });
//         }
//     );
// };

// Item.remove = (id, result) => {
//     sql.query("DELETE FROM imagenes WHERE id_catal = ?", id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         if (res.affectedRows == 0) {
//             // not found Item with the id
//             result({ kind: "not_found" }, null);
//             return;
//         }

//         result(null, res);
//     });
// };


module.exports = Item;