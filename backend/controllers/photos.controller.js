// const Photo = require("../models/photosM");
const path = require("path");

var fs = require("fs");
var filePath = "../uploads/ma.JPG";

const ControladorPhotos = {};

// ControladorPhotos.DeletePhoto = async(req, res) => {
//     await fs.unlinkSync(path.resolve("./uploads/" + req.params.url));
//     res.json({ titulo: "Operacion exitosa.", contenido: "Foto eliminada" });
// };

// ControladorPhotos.DeletePhotoAndData = async(req, res) => {
//     await fs.unlinkSync(path.resolve("./uploads/" + req.params.url));

//     await Photo.findByIdAndRemove(req.params.id, function(err, doc) {
//         if (err)
//             res.status(409).json({
//                 titulo: "Operacion nula.",
//                 contenido: "Error del servidor intentar luego"
//             });
//         else {
//             res.json({ titulo: "Operacion exitosa.", contenido: "Foto eliminada." });
//         }
//     });
// };

// ControladorPhotos.getOnePhoto = async(req, res) => {
//     let file = req.params.filename;
//     await res.sendFile(path.resolve("./uploads/" + file));
// };

// ControladorPhotos.getIdOnePhoto = async(req, res) => {
//     const photos = await Photo.findOne({ url: req.params.url });
//     res.json({ _id: photos._id });
// };
// ControladorPhotos.getDataOnePhoto = async(req, res) => {
//     const photos = await Photo.findOne({ url: req.params.url });
//     res.json(photos);
// };

// ControladorPhotos.getAllPhotos = async(req, res) => {
//     const photos = await Photo.find({ uso: "para admin" });
//     res.json(photos);
// };

ControladorPhotos.CreatePhoto = async(req, res) => {
    // var photo = new Photo();
    console.log(`req.files`, req.files);
    res.json({ titulo: "Pruebas", });
    // (photo.nombre = req.params.nombre),
    // (photo.url = req.files.uploads[0].path.split("/")[1]),
    // (photo.uso = req.params.uso),
    // await photo.save((err, doc) => {
    //     if (!err) {
    //         res.json({
    //             photo: doc,
    //             titulo: "Operacion exitosa.",
    //             contenido: "Foto subida."
    //         });
    //     } else {
    //         if (err.code == 11000) {
    //             res.status(422).json({
    //                 titulo: "Operacion nula.",
    //                 contenido: "Nombre de la foto ya está siendo utilizado."
    //             });
    //         } else {
    //             res.json({
    //                 titulo: "Operacion nula.",
    //                 contenido: "Error del servidor."
    //             });
    //         }
    //     }
    // });
};

// ControladorPhotos.UpdatePhoto = async(req, res) => {
//     const photor = {
//         nombre: req.params.nombre,
//         url: req.files.uploads[0].path.split("\\")[1],
//         uso: req.params.uso
//     };

//     await Photo.findByIdAndUpdate(
//         req.params.id, { $set: photor }, { new: true },
//         function(err, model) {
//             if (!err)
//                 res.json({
//                     titulo: "Operacion exitosa.",
//                     contenido: "Photo actualizada.",
//                     url: model.url
//                 });
//             else {
//                 if (err.code == 11000)
//                     res.status(422).json({
//                         titulo: "Operacion nula.",
//                         contenido: "Photo introducida ya existe.",
//                         url: model.url
//                     });
//                 else
//                     res.json({
//                         titulo: "Operacion nula.",
//                         contenido: "Photo intoducida no existe.",
//                         url: model.url
//                     });
//             }
//         }
//     );
// };

// ControladorPhotos.UpdateDataPhoto = async(req, res) => {
//     const photor = {
//         nombre: req.params.nombre,
//         uso: req.params.uso
//     };

//     await Photo.findByIdAndUpdate(
//         req.params.id, { $set: photor }, { new: true },
//         function(err, model) {
//             if (!err)
//                 res.json({
//                     titulo: "Operacion exitosa.",
//                     contenido: "Photo actualizada."
//                 });
//             else {
//                 if (err.code == 11000)
//                     res.status(422).json({
//                         titulo: "Operacion nula.",
//                         contenido: "Photo introducida ya existe."
//                     });
//                 else
//                     res.json({
//                         titulo: "Operacion nula.",
//                         contenido: "Photo intoducida no existe."
//                     });
//             }
//         }
//     );
// };

module.exports = ControladorPhotos;