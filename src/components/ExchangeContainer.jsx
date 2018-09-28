import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookOrdersRequest } from '../store/bookActions';
import Exchange from './Exchange';

const propTypes = {
	bookOrders: PropTypes.object.isRequired,
	fetchBookOrders: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired
};

class ExchangeContainer extends React.Component {
	componentDidMount() {
		this.props.fetchBookOrders();
	}

  render() {
  	return (
			<Exchange {...this.props}/>
  	);
  }
}

function mapStateToProps(state) {
  return {
		bookOrders: state.orders.bookOrders || {},
		isFetching: state.orders.isFetching
	}
}


function mapDispatchToProps(dispatch) {
  return {
    fetchBookOrders: () => {
			dispatch(fetchBookOrdersRequest());
		}
  }
}

ExchangeContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer);