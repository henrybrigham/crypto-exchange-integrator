//////////////////
// Dependencies //
//////////////////
let fs = require('fs');
let path = require('path');
let express = require("express");
let helmet     = require('helmet');
let bodyParser = require("body-parser");
let app        = module.exports = express();
let session    = require('client-sessions');
let http       = require('http').Server(app);
let expressSession = require("express-session");

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

// app.get('/', function(req, res) {
//   res.sendFile(path.resolve(__dirname + '/../src/index.html'))
// });

// app.use(express.static(path.resolve(__dirname + '/../src/')))

///////////////////////
// Import/Use Routes //
///////////////////////
let orders     = require('./routes/orders');
let bittrex     = require('./routes/bittrex');
let poloniex     = require('./routes/poloniex');

app.use('/bittrex', bittrex);
app.use('/orders', orders);
app.use('/poloniex', poloniex);

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
