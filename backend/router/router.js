const express = require('express');
const connection = require('../connection/connection');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/users', (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

router.post('/users', urlencodedParser, (req, res) => {
    let { username } = req.body;
    console.log("Insertando: ", username);
    connection.query('INSERT INTO usuarios SET username=?', username, function (error, results, fields) {
        if (error) {
            res.send({
                icon: 'error',
                title: 'Ocurrió un error al intentar agregar el usuario',
                text: error.message
            });
            throw error;
        };
        res.send({
            icon: 'success',
            title: 'Perfecto!',
            text: 'Usuario agregado correctamente'
        });
    });
});

router.delete('/users', (req, res) => {
    connection.query('DELETE FROM usuarios', function (error, results, fields) {
        if (error) {
            res.send({
                icon: 'error',
                title: 'Ocurrió un error al intentar eliminar todos los usuarios',
                text: error.message
            });
            throw error;
        };
        res.send({
            icon: 'success',
            title: 'Perfecto!',
            text: 'Todos los usuarios han sido eliminados correctamente'
        });
    });
});

router.delete('/users/all', (req, res) => {
    let {selectedUsers} = req.body;
    console.log(selectedUsers);
    console.log(Array(selectedUsers.length).fill('?'))
    /* let sql = "DELETE FROM usuarios WHERE id IN ";
    selectedUsers.forEach(element => {
        sql+""
    }); */
});

module.exports = router;