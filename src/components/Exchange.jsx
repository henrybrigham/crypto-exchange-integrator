import React from 'react';
import PropTypes from 'prop-types';
import BookOrder from './BookOrder';
const BookOrderHelpers = require('../helpers/bookOrderHelpers');

const propTypes = {
	bookOrders: PropTypes.object.isRequired,
};

class Exchange extends React.Component {
  render() {
		const { bittrexOrders, poloniexOrders} = this.props.bookOrders;

		let mappedBids;
		let mappedAsks;

		if (bittrexOrders !== undefined && poloniexOrders !== undefined) {
			const totalBids = bittrexOrders.bids.concat(poloniexOrders.bids);
			const totalAsks = bittrexOrders.asks.concat(poloniexOrders.asks);
			const sortedBids = BookOrderHelpers.sortBookOrders(totalBids);
			const sortedAsks = BookOrderHelpers.sortBookOrders(totalAsks);

			mappedBids = sortedBids.map((order, i) => {
				return <BookOrder bookOrder={order} key={i}/>
			});

			mappedAsks = sortedAsks.map((order, i) => {
				return <BookOrder bookOrder={order} key={i}/>
			})
		}
		
  	return (
			<div className="page">
				<h2 className="pageHeader">Exchange</h2>
				<div className="row even">
					<div className="exchangeContainer column">
						<h1>Bids Book</h1>
						{mappedBids}
					</div>
					<div className="exchangeContainer column">
					<h1>Asks Book</h1>
						{mappedAsks}
					</div>
				</div>
  		</div>
  	);
  }
}

export default Exchange;