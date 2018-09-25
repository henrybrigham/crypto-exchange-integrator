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
const poloniex = new Poloniex(); 
poloniex.openWebSocket();
poloniex.subscribe('BTC_ETH');
poloniex.on('message', (channelName, data, seq) => {
  if (channelName === 'BTC_ETH') {
		if (data[0].type === 'orderBook') {
			bookOrders.poloniexOrders = data[0].data
		} else if (data[0].type === 'orderBookRemove') {
			const rate = data[0].data.type.rate;
			if (data[0].data.type === 'bid') {
				delete bookOrders.poloniexOrders.bids[rate];
			} else {
				delete bookOrders.poloniexOrders.asks[rate];
			}
		} else if (data[0].type === 'orderBookModify') {
			const type = data[0].data.type;
			const amount = data[0].data.amount;
			if (type === 'bid') {
				bookOrders.poloniexOrders.bids.rate = amount;
			} else {
				bookOrders.poloniexOrders.asks.rate = amount;
			}
		}
  }
});
 
poloniex.on('close', (reason, details) => {
  console.log(`Poloniex WebSocket connection disconnected`);
});
 
poloniex.on('error', (error) => {
	errors.poloniexError = error;
});
 
poloniex.openWebSocket({ version: 2 });

io.attach(server);
io.on('connection', function(socket){
  socket.on('action', (action) => {
		bittrex.websockets.client(function() {
			bittrex.websockets.subscribe(['BTC-ETH'], function(data, err) {
				if (data.M === 'updateExchangeState') {
					bookOrders.bittrexOrders = data.A;
					if (Object.keys(errors.poloniexError).length > 0 || Object.keys(errors.bittrexError).length > 0) {
						socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
					} else {
						socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
					}	
				}
				else if (err) {
					errors.bittrexErrors = err.
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
				}
			});
		});
    if (action.type === 'orders/GET_BOOK_ORDERS_REQUEST') {
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
