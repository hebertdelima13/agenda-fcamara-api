require ('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

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
server.use(express.urlencoded({extended: true}));


server.use(express.static(__dirname+'/public'));

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use('/', apiRoutes);

server.listen(process.env.PORT || 5000);