import React from 'react';
import PropTypes from 'prop-types';
import BittrexLogo from '../assets/bittrexLogo.svg';
import PoloniexLogo from '../assets/poloniexLogo.svg';

const propTypes = {
	bookOrder: PropTypes.object.isRequired,
};

const BookOrder = ({bookOrder}) => {
	let logoSource;
	if (bookOrder.Exchange === 'bittrex'){
		logoSource = BittrexLogo;
	} else {
		logoSource = PoloniexLogo;
	}
	return (
		<div className="bookOrder row">
			<div className="cell25 alignLeft">
				<img className="orderLogo" 
				alt="exchange logo"
				src={logoSource} />
			</div>
			<div className="cell25 center alignLeft">
				<span className="rate">{bookOrder.Rate}</span>
			</div>
			<div className="cell25 center alignLeft">
				<span className="rate">{bookOrder.Quantity}</span>
			</div>
		</div>
	);
}
BookOrder.propTypes = propTypes;

export default BookOrder;