const sql = require("../config/connection");
const util = require('util');
const _ = require('lodash');
const marcamodelo = require("../models/marcamodelo.model");
const Usuario = require("../models/user.model");


// constructor
const Item = function(item_) {
    this.anio_catal = item_.anio_catal;
    this.cilind_catal = item_.cilind_catal;
    this.color_catal = item_.color_catal;
    this.estado_catal = item_.estado_catal;
    this.id_marcamodelo = item_.id_marcamodelo;
    this.id_user = item_.id_user;
    this.inter_catal = item_.inter_catal;
    this.precio_catal = item_.precio_catal;
    this.trans_catal = item_.trans_catal;


};

Item.create = (nuevo_body, filesInfo, result) => {
    // sql.query("INSERT INTO catalogo SET ?", nuevo_body, (err, res) => {
    //     if (err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //         return;
    //     }



    //     result(null, { id: res.insertId, ...nuevo_body });
    // });

    const query = util.promisify(sql.query).bind(sql);
    (async() => {
        try {
            const infoCatal = await query("INSERT INTO catalogo SET ?", nuevo_body);
            console.log('>>>>>>>>>>>>>>>>>>>>>>');
            console.log(infoCatal);

            console.log('>>>>>>>>>>>>>>>>>>>>>>');
            for (let i = 0; i < filesInfo.length; i++) {
                const element = filesInfo[i];
                // console.log(`=================`);
                // console.log(`element`, element.path.split("\\")[1]);
                // console.log(`=================`);
                // console.log('');
                const obj = {
                    id_catal: infoCatal.insertId,
                    fileName: element.path.split("\\")[1]
                }
                const infoImg = await query("INSERT INTO imagenes SET ?", obj);
            }

            result(null, { id: infoCatal.insertId, ...nuevo_body });
            query.end();
        } catch (error) {
            console.error(error);

        }
    })()
};

Item.findById = (id, result) => {
    const query = util.promisify(sql.query).bind(sql);
    (async() => {
        try {
            const row = await query(`SELECT * FROM catalogo WHERE id_catal = ${id}`);
            const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${row[0].id_marcamodelo}`);
            const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${row[0].id_user}`)
            row[0].marcamodelo = marca_modelo[0]
            row[0].usuario = usuario_[0]
            result(null, row[0]);
        } finally {
            query.end();
        }
    })()
};
Item.searchAll = (id_marcamodelo, desde, hasta, estado, result) => {
    const query = util.promisify(sql.query).bind(sql);
    (async() => {
        try {
            const catalogo = []
            const rows = await query(`SELECT * FROM catalogo WHERE id_marcamodelo = ${id_marcamodelo} AND estado_catal = '${estado}' AND anio_catal BETWEEN ${desde} AND ${hasta}`);
            for (let i = 0; i < rows.length; i++) {
                const element = rows[i];
                const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${element.id_marcamodelo}`);
                const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${element.id_user}`);
                element.marcamodelo = marca_modelo[0]
                element.usuario = usuario_[0]
                catalogo.push(element)
            }
            result(null, catalogo);
        } finally {
            query.end();
        }
    })()
};


Item.getAll = async result => {

    const query = util.promisify(sql.query).bind(sql);
    (async() => {
        try {
            const catalogo = []
            const rows = await query('select * from catalogo');
            for (let i = 0; i < rows.length; i++) {
                const element = rows[i];
                const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${element.id_marcamodelo}`);
                const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${element.id_user}`);
                element.marcamodelo = marca_modelo[0]
                element.usuario = usuario_[0]
                catalogo.push(element)
            }

            result(null, catalogo);
        } finally {
            query.end();
        }
    })()
};

Item.updateById = (id, body, result) => {
    sql.query(
        "UPDATE catalogo  SET ? WHERE id_catal = ?", [body, id],
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
    sql.query("DELETE FROM catalogo WHERE id_catal = ?", id, (err, res) => {
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