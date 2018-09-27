import React from 'react';
import PropTypes from 'prop-types';
import BookOrder from './BookOrder';

const propTypes = {
	bookOrders: PropTypes.object.isRequired,
};

class Exchange extends React.Component {
  render() {
		console.log(this.props.bookOrders);
		// console.log('values', Object.values(this.props.bookOrders));

		// let mappedBittrexBids;
		// if (this.props.bookOrders.bittrexOrders.bids !== undefined) {
		// 	mappedBittrexBids = this.props.bookOrders.bittrexOrders.Buys.map((order, i) => {
		// 		return <BookOrder bookOrder={order}/>
		// 	})
		// }
		
  	return (
			<div className="page">
				<h2 className="pageHeader">Exchange</h2>
				<div className="exchangeContainer">
				</div>
  		</div>
  	);
  }
}

export default Exchange;