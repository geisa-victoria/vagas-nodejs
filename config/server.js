const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors')

const server = express();

    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json())
    server.use(cors());

    //consign is useful to modularize any js script, including middlewares
    //include what's inside app folder and paste it into server object
    consign({
        locale: 'en-us',
    })
        .include('./config/firebaseConfig.js')
        .include('./app/routes')
        .into(server)

module.exports = server;