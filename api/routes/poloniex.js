let express    = require('express');
let router     = express.Router();
let gar        = global.appRoot;
const Poloniex = require('poloniex-api-node');

router.get('/', function(req, res) {
	console.log('poloniex');
	let poloniex = new Poloniex();

	poloniex.returnTicker((err, ticker) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log(ticker);
		}
	});
});

module.exports = router;
