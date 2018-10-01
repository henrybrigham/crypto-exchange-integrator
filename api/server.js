//////////////////
// Dependencies //
//////////////////
const express = require("express");
const bodyParser = require("body-parser");
const cors       = require('cors');
const app        = module.exports = express();
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

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
	console.log('listening', `${PORT}`);
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

app.use(cors({
	origin: true,
	credentials: true
}));

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
			try {
				const response = await axios.get(url);
				const formattedBittrexBookOrders = Helpers.formatBittrexOrders(response.data.result);
				bookOrders.bittrexOrders = formattedBittrexBookOrders;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
				setTimeout(getBittrexBook, 3000, url);
			} catch (error) {
				console.log('*bittrex error', error);
				errors.bittrexError = error;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });	
				setTimeout(getBittrexBook, 3000, url);
			}
		};

		const getPoloniexBook = async url => {
			try {
				const response = await axios.get(url);
				const formattedPoloniexBookOrders = Helpers.formatPoloniexOrders(response.data);
				bookOrders.poloniexOrders = formattedPoloniexBookOrders;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_SUCCESS', payload: bookOrders });
				setTimeout(getPoloniexBook, 3000, url);
			} catch (error) {
				console.log('poloniex error', error);
				errors.poloniexError = error;
				socket.emit('action', { type: 'orders/GET_BOOK_ORDERS_FAILURE', payload: errors });
				setTimeout(getPoloniexBook, 3000, url);
			}
		};

    if (action.type === 'orders/GET_BOOK_ORDERS_REQUEST') {
			const poloniexUrl = marketUrls.poloniex[action.market];
			const bittrexUrl = marketUrls.bittrex[action.market];

			getPoloniexBook(poloniexUrl);
			getBittrexBook(bittrexUrl);
		}
	});
});

///////////////////////
// Import/Use Routes //
///////////////////////
app.use(function(req, res, next) {
	res.status(404);
	res.send("no");
});
