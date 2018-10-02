import React from 'react';
import PropTypes from 'prop-types';
import ScrollUpButton from "react-scroll-up-button";
import Loader from '../assets/loading.gif';
import BookOrder from './BookOrder';
import axios from 'axios';
import ExchangeHeader from './ExchangeHeader';
import MarketSelector from './MarketSelector'

const propTypes = {
	bookOrders: PropTypes.object.isRequired,
	fetchBookOrders: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired
};

class Exchange extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		const { fetchBookOrders, error } = nextProps;
		if(error) {
			fetchBookOrders(prevState.selectedMarket.value)
		}
    return null;
	}
	
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
		function getBittrexBook(url) {
			try {
				const response = axios.get(url);
				console.log('*bittrex response', response);

			} catch (error) {
				console.log('*bittrex error', error);
				
			}
		};
		getBittrexBook('https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-ETH&type=both');

		this.props.fetchBookOrders(this.state.selectedMarket.value);
	}

	calculateVolume = (orders) => {
		let coinSum = 0;
		orders.forEach(order => {
			coinSum += order.Quantity;
		})
		return coinSum;
	}

	sortBookOrders(orders) {
		const sortedOrders = orders.sort((a, b) => {
			return b.Rate - a.Rate;
		});
		return sortedOrders;
	};

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

		if (!this.props.isFetching && (bittrexOrders !== undefined && poloniexOrders !== undefined)) {
			if (bittrexOrders.bids !== undefined && poloniexOrders.bids !== undefined) {
				const totalBids = bittrexOrders.bids.concat(poloniexOrders.bids);
				const totalAsks = bittrexOrders.asks.concat(poloniexOrders.asks);
				sortedBids = this.sortBookOrders(totalBids);
				sortedAsks = this.sortBookOrders(totalAsks);
	
				mappedBids = sortedBids.map((order, i) => {
					return <BookOrder bookOrder={order} key={i}/>
				});
	
				mappedAsks = sortedAsks.map((order, i) => {
					return <BookOrder bookOrder={order} key={i}/>
				});
	
				return (
					<div className="row even">
						<div className="exchangeContainer column">
							<ExchangeHeader title='Bids' totalCurrency={this.calculateVolume(sortedBids)} 
							market={this.state.selectedMarket.value}/>
							{mappedBids}
						</div>
						<div className="exchangeContainer column">
							<ExchangeHeader title='Asks' totalCurrency={this.calculateVolume(sortedAsks)} 
							market={this.state.selectedMarket.value}/>
							{mappedAsks}
						</div>
					</div>
				);
			}
			
		}
		else {
			return (
				<img alt="loader gif" src={Loader} />);
		}
	}

  render() {
  	return (
			<div className="page">
				<h2 className="pageHeader">Bittloniex Exchange</h2>
				<MarketSelector selectedMarket={this.state.selectedMarket}
				onSelect={this.onSelect} />
				{this.renderOrders()}
				<ScrollUpButton />
  		</div>
  	);
  }
}

Exchange.propTypes = propTypes;
export default Exchange;