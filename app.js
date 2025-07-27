import dotenv from 'dotenv';
import Server from './src/models/Server.js';

dotenv.config();

//const Server = require('./src/models/Server');

const server = new Server();

server.listen();
