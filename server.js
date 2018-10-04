const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/'));
app.listen(80);
console.log('listening 80');