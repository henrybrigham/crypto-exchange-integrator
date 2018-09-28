import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../assets/loading.gif';
import BookOrder from './BookOrder';
import ExchangeHeader from './ExchangeHeader';
import MarketSelector from './MarketSelector'
const BookOrderHelpers = require('../helpers/bookOrderHelpers');

const propTypes = {
	bookOrders: PropTypes.object.isRequired,
	fetchBookOrders: PropTypes.func.isRequired
};

class Exchange extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMarket: {
				value: 'ETH/BTC',
				label: 'ETH/BTC'
			}
		}
	}

	componentDidMount() {
		this.props.fetchBookOrders(this.state.selectedMarket.value);
	}

	calculateVolume = (orders) => {
		let coinSum = 0;
		orders.forEach(order => {
			coinSum += order.Quantity;
		})
		return coinSum;
	}

	onSelect = (selectedMarket) => {
		this.setState({selectedMarket});
		this.props.fetchBookOrders(selectedMarket.value);
	}

	renderOrders = () => {
		const { bittrexOrders, poloniexOrders} = this.props.bookOrders;

		let mappedBids;
		let mappedAsks;
		let sortedBids;
		let sortedAsks;

		if (bittrexOrders !== undefined && poloniexOrders !== undefined) {
			const totalBids = bittrexOrders.bids.concat(poloniexOrders.bids);
			const totalAsks = bittrexOrders.asks.concat(poloniexOrders.asks);
			sortedBids = BookOrderHelpers.sortBookOrders(totalBids);
			sortedAsks = BookOrderHelpers.sortBookOrders(totalAsks);

			mappedBids = sortedBids.map((order, i) => {
				return <BookOrder bookOrder={order} key={i}/>
			});

			mappedAsks = sortedAsks.map((order, i) => {
				return <BookOrder bookOrder={order} key={i}/>
			});
		}
		if (!this.props.isFetching && (bittrexOrders !== undefined && poloniexOrders !== undefined)) {
			return (
				<div className="row even">
					<div className="exchangeContainer column">
						<ExchangeHeader title='Bids' totalCurrency={this.calculateVolume(sortedBids)} />
						{mappedBids}
					</div>
					<div className="exchangeContainer column">
						<ExchangeHeader title='Asks' totalCurrency={this.calculateVolume(sortedAsks)} />			
						{mappedAsks}
					</div>
				</div>
			);
		}
		else {
			return <img src={Loader} />;
		}
	}

  render() {
  	return (
			<div className="page">
				<MarketSelector selectedMarket={this.state.selectedMarket}
				onSelect={this.onSelect} />
				<h2 className="pageHeader">Exchange</h2>
				{this.renderOrders()}
  		</div>
  	);
  }
}

Exchange.propTypes = propTypes;
export default Exchange;