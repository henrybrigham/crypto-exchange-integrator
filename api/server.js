//////////////////
// Dependencies //
//////////////////
const express = require("express");
const bodyParser = require("body-parser");
const cors       = require('cors');
const http       = require('http');
const socket_io  = require('socket.io');
const axios 	   = require("axios");
const Helpers = require('./helpers');
const marketUrls = require('./enumerations/marketUrls');
let app = express();
const sharedsession = require('express-socket.io-session');
let session = require('express-session')({
  secret: 'my-secret',
  resave: true,
  saveUninitialized: true
});

////////////
// Server //
////////////
const server = http.createServer(app);
const io = socket_io(server);

/////////////
// Session //
/////////////
// Use express-session middleware for express
app.use(session);

app.use(function(req, res, next) {
  console.log(req.METHOD, req.url);
  next();
});

// Use shared session middleware for socket.io
io.use(sharedsession(session, {
  autoSave:true
}));

////////////
// Sockets //
////////////
io.attach(server);
io.on('connection', function(socket){
	let requestNumber = 0;

	let errors = {
		poloniexError: '',
		bittrexError: ''
	};
	let bookOrders = {
		poloniexOrders: {},
		bittrexOrders: {}
	}

  socket.on('action', (action) => {
		socket.handshake.session.market = action.market;
		socket.handshake.session.save();

		const getBittrexBook = async (url, number) => {
			try {
				const response = await axios.get(url);
				const formattedBittrexBookOrders = Helpers.formatBittrexOrders(response.data.result);
				bookOrders.bittrexOrders = formattedBittrexBookOrders;
				if(requestNumber === number) {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
					setTimeout(getBittrexBook, 2000, url, number);
				}
			} catch (error) {
				errors.bittrexError = error;
				if(requestNumber === number) {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });	
				}
			}
		};

		const getPoloniexBook = async (url, number) => {
			try {
				const response = await axios.get(url);
				const formattedPoloniexBookOrders = Helpers.formatPoloniexOrders(response.data);
				bookOrders.poloniexOrders = formattedPoloniexBookOrders;
				if(requestNumber === number) {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
					setTimeout(getPoloniexBook, 2000, url, number);
				}
			} catch (error) {
				errors.poloniexError = error;
				if(requestNumber === number) {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
				}
			}
		};

    if (action.type === 'orders/GET_BOOK_ORDERS_REQUEST') {
			const poloniexUrl = marketUrls.poloniex[action.market];
			const bittrexUrl = marketUrls.bittrex[action.market];
			requestNumber += 1;
			getPoloniexBook(poloniexUrl, requestNumber);
			getBittrexBook(bittrexUrl, requestNumber);
		}
	});
	
	socket.on('disconnect', function () {
		requestNumber += 1;
		delete socket.handshake.session.market;
    socket.handshake.session.save();
	 });
});

///////////////////////
// Import/Use Routes //
///////////////////////
app.use(function(req, res, next) {
	res.status(404);
	res.send("no");
});

server.listen(8000, () => {
	console.log('listening, 8000');
});