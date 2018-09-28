import React from 'react';
import PropTypes from 'prop-types';
import BookOrder from './BookOrder';
const BookOrderHelpers = require('../helpers/bookOrderHelpers');

const propTypes = {
	title: PropTypes.string.isRequired,
	totalCurrency: PropTypes.number
};
const defaultProps = {
	totalCurrency: '',
}
const ExchangeHeader = ({title, totalCurrency, coinType}) => {
	return (
		<div className="row exchangeHeader">
			<div>{title}</div>
			<div className="row center mLA">
				<p className="sum">Sum:</p>
				<div>{totalCurrency}</div>
				<div> ETH</div>
			</div>
			
		</div>
	);
};
ExchangeHeader.propTypes = propTypes;
ExchangeHeader.defaultProps = defaultProps;

export default ExchangeHeader;