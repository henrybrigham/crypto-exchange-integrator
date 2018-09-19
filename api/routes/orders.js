let express    = require('express');
const axios 	 = require("axios");
let router     = express.Router();
let gar        = global.appRoot;

router.get('/', function(req, res) {
	console.log('orders');
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
			res.status(500).send('error', error);
		}
	};

	Promise.all([
		getPoloniexBook(poloniexUrl),
		getBittrexBook(bittrexUrl)
	]).then(() => {
		if (errors.length > 0) {
			res.status(500).send('error', errors);
		} else {
			res.status(200).send(orders);
		}	});
});

module.exports = router;
