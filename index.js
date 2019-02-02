// const http = require('http');
// const express = require('express');

const server = require('./config/server');
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     res.write('Hello World')
//     res.end();
// }).listen(3000, () => {
//     console.log('Server listening on port 3000');
// })

// const server = express();
// const port = 3000;

// server.get('/', (req, res) => {
//     res.send('Helllo World')
// })

// server.get('/', (req, res) => {
//     res.send('Recebido!!')
// })

// server.get('/users', (req, res) => {
//     res.json([{"name": "João"},{"name": "Adriano"}])
// })