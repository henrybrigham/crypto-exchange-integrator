//////////////////
// Dependencies //
//////////////////
const fs = require('fs');
const path = require('path');
const express = require("express");
const helmet     = require('helmet');
const bodyParser = require("body-parser");
const cors       = require('cors');
const app        = module.exports = express();
const session    = require('client-sessions');
const http       = require('http');
const socket_io  = require('socket.io');
const axios 	   = require("axios");
const expressSession = require("express-session");
var bittrex = require('node-bittrex-api');
const Poloniex = require('poloniex-api-node');

////////////
// Server //
////////////
const server = http.createServer();
const io = socket_io();
const WebSocketClient = require('websocket').client;

server.listen(8000, () => {
	console.log('listening, 8000');
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
const errors = {
	poloniexError: '',
	bittrexError: ''
};
const bookOrders = {
	poloniexOrders: {},
	bittrexOrders: {}
}
		
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

////////////
// Sockets //
////////////
io.attach(server);
io.on('connection', function(socket){
  socket.on('action', (action) => {
		const getBittrexBook = async url => {
			console.log('bittRex called');
			try {
				const response = await axios.get(url);
				bookOrders.bittrexOrders = response.data.result;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
				setTimeout(getBittrexBook, 5000, url);
			} catch (error) {
				console.log('*bittrex error', error);
				errors.bittrexError = error;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });			}
		};

		const getPoloniexBook = async url => {
			console.log('Poloniex called');
			try {
				const response = await axios.get(url);
				bookOrders.poloniexOrders = response.data;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
				setTimeout(getPoloniexBook, 5000, url);

				// console.log('success', response.data);
			
			} catch (error) {
				console.log('error', error);
				errors.poloniexError = error;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
			}
		};

    if (action.type === 'orders/GET_BOOK_ORDERS_REQUEST') {
			console.log('**actionRequest');
			const poloniexUrl =
		'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=100';
		const bittrexUrl = 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both';
			getPoloniexBook(poloniexUrl);
			getBittrexBook(bittrexUrl);
			if (errors.length > 0) {
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
			} else {
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
			}	
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
