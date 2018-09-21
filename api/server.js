//////////////////
// Dependencies //
//////////////////
const fs = require('fs');
const path = require('path');
const express = require("express");
const helmet     = require('helmet');
const bodyParser = require("body-parser");
const app        = module.exports = express();
const session    = require('client-sessions');
const http       = require('http').Server(app);
const expressSession = require("express-session");

////////////////
// Misc Setup //
////////////////
app.locals.basedir = __dirname;
let gar = global.appRoot = app.locals.basedir;

try {
  app.secret = require(`${gar}/secrets`);
} catch (err) {
  app.secret = {
    appSecret: '4b7b78a47825bfbd0d58a7851f73450197b779fd446cef73196a7063c9e4a150'
  };
}

////////////////
// Middleware //
////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(helmet());


// app.use(cors({
// 	origin: true,
// 	credentials: true
// }));

// app.use(expressSession({
// 	secret: "lsjkhflsdkjfhsdlkjfh",
// 	resave: false,
// 	saveUninitialized: false
// }));

app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

///////////////////////
// Import/Use Routes //
///////////////////////
let orders     = require('./routes/orders');
app.use('/orders', orders);
require('./routes/errorRoutes');

try {
  var httpsConfig = {
    key: fs.readFileSync('/etc/letsencrypt/live/collidoscope-music.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/collidoscope-music.com/cert.pem'),
  };

  var httpsServer = https.createServer(httpsConfig, app);
  httpsServer.listen(443);
}
catch (e){
  console.log(`
WARNING: not connected over https.
NOTE: if you are developing this is okay.
`);
}

app.use(function(req, res, next) {
	res.status(404);
	res.send("no");
});

app.listen(8000, function() {
	console.log("Server started on Port: 8000");
});
