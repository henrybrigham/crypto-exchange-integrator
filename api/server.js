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
		const poloniexUrl =
		'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=10';

		const bittrexUrl = 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both';
		const errors = [];
		const orders = {
			poloniexOrders: {},
			bittrexOrders: {}
		}
		const getPoloniexBook = async url => {
			try {
				const response = await axios.get(url);
				orders.poloniexOrders = response.data;
				console.log('success');
			
			} catch (error) {
				console.log('error', error);
				errors.push(error);
			}
		};

		const getBittrexBook = async url => {
			try {
				const response = await axios.get(url);
				orders.bittrexOrders = response.data;
			} catch (error) {
				console.log('error', error);
				errors.push(error);
			}
		};

		console.log('SOCKETTTT', action);
    if (action.type === 'orders/GET_BOOK_ORDERS_REQUEST') {
			Promise.all([
				getPoloniexBook(poloniexUrl),
				getBittrexBook(bittrexUrl)
			]).then(() => {
				if (errors.length > 0) {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
				} else {
					socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: orders });
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
