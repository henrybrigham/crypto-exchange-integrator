import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookOrdersRequest } from '../store/bookActions';
import Exchange from './Exchange';

const propTypes = {
	bookOrders: PropTypes.object.isRequired,
	fetchBookOrders: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired
};

const ExchangeContainer = ({ bookOrders, fetchBookOrders, isFetching, error }) => (
	<Exchange bookOrders={bookOrders}
	fetchBookOrders={fetchBookOrders}
	isFetching={isFetching}
	error={error}
	/>
);

function mapStateToProps(state) {
  return {
		bookOrders: state.orders.bookOrders || {},
		isFetching: state.orders.isFetching,
		error: state.orders.error
	}
}


function mapDispatchToProps(dispatch) {
  return {
    fetchBookOrders: (market) => {
			dispatch(fetchBookOrdersRequest(market));
		}
  }
}

ExchangeContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer);
export {ExchangeContainer as TestableExchangeContainer};