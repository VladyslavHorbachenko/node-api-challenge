const express = require('express');
const actionModel = require('./routes/actionModel');
const projectModel = require('./routes/projectModel');

const server = express();

server.use(express.json());

server.use('/project', projectModel);
server.use('/action', actionModel);

server.get('/',(req, res) => {
    res.status(200).json({message:"Welcome"})
})

module.exports = server

