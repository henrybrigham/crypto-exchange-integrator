class BookOrderHelpers {
	static sortBookOrders(orders) {
		const sortedOrders = orders.sort((a, b) => {
			// if (a.Rate === b.Rate) {
			// 	var textA = a.name.toUpperCase();
			// 	var textB = b.name.toUpperCase();
			// 	return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;			
			// }
			return b.Rate - a.Rate;
		});
		// console.log('*sorted', sortedOrders);
		return sortedOrders;
	};
}

module.exports = BookOrderHelpers;


