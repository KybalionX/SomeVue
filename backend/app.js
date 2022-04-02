//Usaremos express para crear la aplicación
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

//El modulo router.js contiene las rutas que usará la aplicación
const router = require('./router/router');

//Usaremos el puerto 3000 como puerto para el backend
app.set('host', 8000);

//Usamos el modulo de rutas que se encuentra en router/router.js
app.use(router);

//Iniciamos el server con express
app.listen(app.get('host'), () => {
    console.log("Iniciado el servidor en el puerto ", app.get('host'));
});