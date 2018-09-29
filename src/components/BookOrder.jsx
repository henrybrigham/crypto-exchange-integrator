import React from 'react';
import PropTypes from 'prop-types';
import BittrexLogo from '../assets/bittrexLogo.svg';
import PoloniexLogo from '../assets/poloniexLogo.svg';

const propTypes = {
	bookOrder: PropTypes.object.isRequired,
};

class BookOrder extends React.Component {
  render() {
		const { bookOrder } = this.props;
		let logoSource;
		if (bookOrder.Exchange === 'bittrex'){
			logoSource = BittrexLogo;
		} else {
			logoSource = PoloniexLogo;
		}
		return (
			<div className="bookOrder row">
				<div className="cell25 alignLeft">
					<img className="orderLogo" src={logoSource} />
				</div>
				<div className="cell25 center">
					<span className="rate">{bookOrder.Rate}</span>
				</div>
				<div className="cell25 center">
					<span className="rate">{bookOrder.Quantity}</span>
				</div>
			</div>
  	);
  }
}

export default BookOrder;