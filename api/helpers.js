class Helpers {
	static formatBittrexOrders(orders) {
		const formattedOrders = {
			asks: [],
			bids: []
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
			asks: [],
			bids: []
		};
		
		orders.asks.forEach(order => {
			const formattedOrder = {
				Exchange: 'poloniex',
				Quantity: order[1],
				Rate: parseFloat(order[0]),
				Type: 'ask'
			} 
			formattedOrders.asks.push(formattedOrder);
		});

		orders.bids.forEach(order => {
			const formattedOrder = {
				Exchange: 'poloniex',
				Quantity: order[1],
				Rate: parseFloat(order[0]),
				Type: 'bid'
			} 
			formattedOrders.bids.push(formattedOrder);
		});
		
		return formattedOrders;
	};
}

module.exports = Helpers;


