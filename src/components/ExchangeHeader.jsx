import React from 'react';
import PropTypes from 'prop-types';
import BookOrder from './BookOrder';
const BookOrderHelpers = require('../helpers/bookOrderHelpers');

const propTypes = {
	title: PropTypes.string.isRequired,
	totalCurrency: PropTypes.number,
	market: PropTypes.string.isRequired
};
const defaultProps = {
	totalCurrency: '',
}

const ExchangeHeader = ({title, totalCurrency, market}) => {
	const coinArray = market.split('/');
	return (
		<div className="column exchangeHeader">
			<div className="row">
				<div>{title}</div>
				<div className="row center mLA">
					<p className="sum">Sum:</p>
					<div>{totalCurrency}</div>
					<div>{coinArray[0]}</div>
				</div>
			</div>
			<div className="row alignLeft">
				<div className="cell25 alignLeft">Exchange</div>
				<div className="cell25 alignLeft">Rate</div>
				<div className="cell25 alignLeft">Quantity</div>
			</div>
		</div>
	);
};
ExchangeHeader.propTypes = propTypes;
ExchangeHeader.defaultProps = defaultProps;

export default ExchangeHeader;