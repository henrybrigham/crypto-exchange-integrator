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
const http       = require('http');
const socket_io  = require('socket.io');
const axios 	   = require("axios");
const expressSession = require("express-session");
////////////
// Server //
////////////
const server = http.createServer();
const io = socket_io();
var WebSocketClient = require('websocket').client;

const subscribePayload = {
	"command": "subscribe",
	"channel": "BTC_ETH"
}

var poloniexSocket = new WebSocketClient([subscribePayload]);

server.listen(8000, () => {
	console.log('listening, 8000');

poloniexSocket.connect('wss://api2.poloniex.com', 'echo-protocol');
console.log('done');
});

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
const errors = [];
const bookOrders = {
	poloniexOrders: {},
	bittrexOrders: {}
}
		
		function getPoloniexBook() {
			try {
				console.log('attempt');

				// const poloniexSocket = socket_io('wss://api2.poloniex.com');
				
				// require('socket.io-client')('wss://api2.poloniex.com');
				// poloniexSocket.connect(); 

				poloniexSocket.on('connect', function(connection) {
					console.log('WebSocket Client Connected');
					connection.on('error', function(error) {
							console.log("Connection Error: " + error.toString());
					});
					connection.on('close', function() {
							console.log('echo-protocol Connection Closed');
					});
					connection.on('message', function(message) {
							if (message.type === 'utf8') {
									console.log("Received: '" + message.utf8Data + "'");
							}
					});
					
					function sendNumber() {
							if (connection.connected) {
									var number = Math.round(Math.random() * 0xFFFFFF);
									connection.sendUTF(number.toString());
									setTimeout(sendNumber, 1000);
							}
					}
					sendNumber();
			});
				// poloniexSocket.on('connect', function(subscribePayload){
				// 	console.log('Client has connected to the server!');

				// 	try{
				// 		console.log('socket connect');
				// 		// socket.emit('configure', {email:myemail, deviceid:device_id});
				// 	}catch(e){ console.log(e); }
				//  });
				// poloniexSocket.on('connection', function(subscribePayload){ 
				// 	console.log('** its working');
				// });
				// var poloniexSocket = io.connect(poloniexUrl);
    		// poloniexSocket.on('message', function(message) {
				// 	orders.poloniexOrders = message;
				// })
				// const response = await axios.get(url, subscribePayload);
				// orders.poloniexOrders = response.data;
			
			} catch (error) {
				console.log('*1error', error);
				errors.push(error);
			}
		};
		
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

////////////
// Socket //
////////////
io.attach(server);
io.on('connection', function(socket){
  socket.on('action', (action) => {
		const bittrexUrl = 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both';

		const getBittrexBook = async url => {
			try {
				const response = await axios.get(url);
				bookOrders.bittrexOrders = response.data;
			} catch (error) {
				console.log('*2error', error);
				errors.push(error);
			}
		};

    if (action.type === 'orders/GET_BOOK_ORDERS_REQUEST') {
			Promise.all([
				getPoloniexBook(),
				getBittrexBook(bittrexUrl)
			]).then(() => {
				if (errors.length > 0) {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
				} else {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
				}	});
				}
	});
});

///////////////////////
// Import/Use Routes //
///////////////////////
let orders     = require('./routes/orders');
app.use('/orders', orders);
require('./routes/errorRoutes');

app.use(function(req, res, next) {
	res.status(404);
	res.send("no");
});

// app.listen(8000, function() {
// 	console.log("Server started on Port: 8000");
// });
