import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookOrdersRequest } from '../store/bookActions';
import Exchange from './Exchange';

const propTypes = {
	orderBooks: PropTypes.object.isRequired,
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
		orderBooks: state.orders.orderBooks || {}
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