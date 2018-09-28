class BookOrderHelpers {
	static sortBookOrders(orders) {
		const sortedOrders = orders.sort((a, b) => {
			return b.Rate - a.Rate;
		});
		return sortedOrders;
	};
}

module.exports = BookOrderHelpers;


