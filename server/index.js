const express = require("express");
const cors = require("cors");
const app = express();
const database = require('./configs/db/mongoDB');

//let isLogin = () => false;

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

let logger = (req, res, next) => {
  console.log("Peticion de tipo: ", req.method);
  next();
};

let showIP = (req, res, next) => {
  console.log("IP: 127.0.0.1");
  next();
};

/* esta parte se va a usar cuando usemos logeo
app.use((req, res, next) => {
    if(isLogin()){
        next();
    }else{
        res.send('No estas logeado');
    }
}, logger, showIP);
*/
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/usuario/", require("./controllers/usuarioController.js"));
app.use("/api/producto/", require("./controllers/productoController.js"));

// inicia servidor
app.listen(3000, () => {
  console.log("iniciamos el servidor en el puerto 3000");
});
