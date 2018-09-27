class Helpers {
	static formatBittrexOrders(orders) {
		const formattedOrders = {
			bids: [],
			asks: []
		};

		orders.buy.forEach(order => {
			order.Type = 'bid';
			order.Exchange = 'bittrex'
			formattedOrders.bids.push(order);
		})
		orders.sell.forEach(order => {
			order.Type = 'ask';
			order.Exchange = 'bittrex'
			formattedOrders.asks.push(order);
		});
		return formattedOrders;
	};

	static formatPoloniexOrders(orders) {
		const formattedOrders = {
			bids: [],
			asks: []
		};
		orders.bids.forEach(order => {
			const formattedOrder = {
				Exchange: 'poloniex',
				Quantity: order[1],
				Rate: order[0],
				Type: 'bid'
			} 
			formattedOrders.bids.push(formattedOrder);
		});
		orders.asks.forEach(order => {
			const formattedOrder = {
				Exchange: 'poloniex',
				Quantity: order[1],
				Rate: order[0],
				Type: 'ask'
			} 
			formattedOrders.asks.push(formattedOrder);
		});
		return formattedOrders;
	};
}

module.exports = Helpers;


