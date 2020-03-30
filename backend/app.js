const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5200" }));
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "ventautos web api." });
});

require("./routes/usuarios.routes")(app);
require("./routes/catalogo.routes")(app);
require("./routes/marcamodelo.routes")(app);
//require("./routes/interes.routes")(app);

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on klk port 3000.");
});