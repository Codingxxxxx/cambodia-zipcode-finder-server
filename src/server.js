const server = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const {apiController} = require('./controller/api.controller');

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(apiController);
server.listen(process.env.PORT);