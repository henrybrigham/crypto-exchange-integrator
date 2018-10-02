const marketUrls = {
	poloniex: {
		'ETH/BTC': 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=100',
		'LTC/BTC': 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_LTC&depth=100',
		'XRP/BTC': 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_XRP&depth=100'
	},
	bittrex: {
		'ETH/BTC': 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both',
		'LTC/BTC': 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-LTC&type=both',
		'XRP/BTC': 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-XRP&type=both'
	}
}

module.exports = marketUrls;