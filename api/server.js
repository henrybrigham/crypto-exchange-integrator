//////////////////
// Dependencies //
//////////////////
const express = require("express");
const bodyParser = require("body-parser");
const cors       = require('cors');
const app        = module.exports = express();
const session    = require('client-sessions');
const http       = require('http');
const socket_io  = require('socket.io');
const axios 	   = require("axios");
const Helpers = require('./helpers');
const marketUrls = require('./enumerations/marketUrls');

////////////
// Server //
////////////
const server = http.createServer();
const io = socket_io();

const errors = {
	poloniexError: '',
	bittrexError: ''
};
const bookOrders = {
	poloniexOrders: {},
	bittrexOrders: {}
}

let requestNumber = 0;

server.listen(8000, () => {
	console.log('listening, 8000');
});

////////////
// Sockets //
////////////
io.attach(server);
io.on('connection', function(socket){
  socket.on('action', (action) => {
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
				console.log('*bittrex error', error);
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
				console.log('poloniex error', error);
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
		console.log('close'); 
	 });
});

///////////////////////
// Import/Use Routes //
///////////////////////
app.use(function(req, res, next) {
	res.status(404);
	res.send("no");
});
