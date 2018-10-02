const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/'));
const PORT = process.env.PORT;

app.listen(PORT);
console.log('listening', PORT);