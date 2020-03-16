const server = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const {apiController} = require('./controller/api.controller');
const {checkAuthMiddleware} = require('./middleware/auth.middleware');

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(checkAuthMiddleware);
server.use(apiController);
server.listen(3001);