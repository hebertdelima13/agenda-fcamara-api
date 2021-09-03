require ('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { compareSync } = require('bcrypt');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.log("Erro: ", error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extend: true}));

server.use(express.static(__dirname+'/public'));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`- Rodando no endereço: ${process.env.BASE}`);
});