const sql = require("../config/connection");
const util = require('util');
const _ = require('lodash');
var nodemailer = require("nodemailer");


// constructor
const Item = function(item_) {
    this.id_catal = item_.id_catal;
    this.id_user = item_.id_user;
    this.nombre_no_registrado = item_.nombre_no_registrado;
    this.correo_no_registrado = item_.correo_no_registrado;
    this.telef_no_registrado = item_.telef_no_registrado;
};

Item.create = (nuevo_body, result) => {
    const query = util.promisify(sql.query).bind(sql);
    (async() => {
        try {
            const info = await query("INSERT INTO interes SET ?", nuevo_body);
            let infoUsuario;
            if (nuevo_body.id_user) {
                infoUsuario = await query(`SELECT * FROM usuarios WHERE id_user = ${nuevo_body.id_user}`);
            }
            infoCatalogo = await query(`SELECT * FROM catalogo WHERE id_catal = ${nuevo_body.id_catal}`);

            infoMarcaModelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${infoCatalogo[0].id_marcamodelo}`);

            infoVendedor = await query(`SELECT * FROM usuarios WHERE id_user = ${infoCatalogo[0].id_user}`);


            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ventautosisc@gmail.com',
                    pass: 'ventautos1617'
                }
            });
            var mailOptions = {
                from: 'ventautosisc@gmail.com',
                to: infoVendedor[0].correo_user,
                subject: 'VENTAUTO: NOTIFICACION DE INTERES',
                text: `El siguiente usuario le a dado interes a la siguiente publicación: ${infoMarcaModelo[0].marca}, ${infoMarcaModelo[0].modelo}, ${infoCatalogo[0].anio_catal} 
                // \n\n Nombre: ${nuevo_body.id_user ? infoUsuario[0].nom_user : nuevo_body.nombre_no_registrado}, Correo: ${nuevo_body.id_user ? infoUsuario[0].correo_user : nuevo_body.correo_no_registrado},Telefono: ${nuevo_body.id_user ? infoUsuario[0].telef_user : nuevo_body.telef_no_registrado}`
            };
            await transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.error(error);
                    result(error, null);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            var mailOptions2 = {
                from: 'ventautosisc@gmail.com',
                to: nuevo_body.id_user ? infoUsuario[0].correo_user : nuevo_body.correo_no_registrado,
                subject: 'VENTAUTO: NOTIFICACION DE INTERES',
                text: `Usted le a dado interes a la siguiente publicación: ${infoMarcaModelo[0].marca}, ${infoMarcaModelo[0].modelo}, ${infoCatalogo[0].anio_catal}
                \n\n Publicado por: ${infoVendedor[0].nom_user}, Correo: ${infoVendedor[0].correo_user}, Telefono: ${infoVendedor[0].telef_user}`

            };
            await transporter.sendMail(mailOptions2, function(error, info) {
                if (error) {
                    console.error(error);
                    result(error, null);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            result(null, { id: info.insertId, ...nuevo_body });
            query.end();
        } catch (error) {
            console.error(error);
        }
    })()
}

// Item.findById = (id, result) => {
//     const query = util.promisify(sql.query).bind(sql);
//     (async() => {
//         try {
//             const row = await query(`SELECT * FROM interes WHERE id_interes = ${id}`);
//             // const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${ row[0].id_marcamodelo}`);
//             const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${ row[0].id_user}`)
//             row[0].marcamodelo = marca_modelo[0]
//             row[0].usuario = usuario_[0]
//             result(null, row[0]);
//         } finally {
//             query.end();
//         }
//     })()
// };

// Item.searchAll = (id_marcamodelo, desde, hasta, estado, result) => {
//     const query = util.promisify(sql.query).bind(sql);
//     (async() => {
//         try {
//             const interes = []
//             const rows = await query(`SELECT * FROM interes WHERE id_marcamodelo = ${id_marcamodelo} AND estado_catal = '${estado}' AND anio_catal BETWEEN ${desde} AND ${hasta}`);
//             for (let i = 0; i < rows.length; i++) {
//                 const element = rows[i];
//                 const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${ element.id_marcamodelo}`);
//                 const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${ element.id_user}`);
//                 element.marcamodelo = marca_modelo[0]
//                 element.usuario = usuario_[0]
//                 interes.push(element)
//             }
//             result(null, interes);
//         } finally {
//             query.end();
//         }
//     })()
// };


// Item.getAll = async result => {

//     const query = util.promisify(sql.query).bind(sql);
//     (async() => {
//         try {
//             const interes = []
//             const rows = await query('select * from interes');
//             for (let i = 0; i < rows.length; i++) {
//                 const element = rows[i];
//                 const marca_modelo = await query(`SELECT * FROM marcamodelo WHERE id_marcamodelo = ${ element.id_marcamodelo}`);
//                 const usuario_ = await query(`SELECT * FROM usuarios WHERE id_user = ${ element.id_user}`);
//                 element.marcamodelo = marca_modelo[0]
//                 element.usuario = usuario_[0]
//                 interes.push(element)
//             }

//             result(null, interes);
//         } finally {
//             query.end();
//         }
//     })()
// };

// Item.updateById = (id, body, result) => {
//     sql.query(
//         "UPDATE interes  SET ? WHERE id_catal = ?", [body, id],
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
//     sql.query("DELETE FROM interes WHERE id_catal = ?", id, (err, res) => {
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