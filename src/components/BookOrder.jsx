import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	bookOrder: PropTypes.object.isRequired,
};

class BookOrder extends React.Component {
  render() {
		const {bookOrder} = this.props;
		console.log('order', bookOrder);
  	return (
			<div className="bookOrder">
				<div>
					<span className="label">Rate</span>
					<span className="rate">{bookOrder.Rate}</span>
				</div>
				<div>
					<span className="label">quantity</span>
					<span className="rate">{bookOrder.Quantity}</span>
				</div>
			</div>
  	);
  }
}

export default BookOrder;