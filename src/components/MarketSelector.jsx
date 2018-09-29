import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const propTypes = {
	selectedMarket: PropTypes.object.isRequired,
	onSelect: PropTypes.func.isRequired
};

const options = [
  { value: 'ETH/BTC', label: 'ETH/BTC' },
  { value: 'LTC/BTC', label: 'LTC/BTC' },
  { value: 'XRP/BTC', label: 'XRP/BTC' }
];

class MarketSelector extends React.PureComponent {
  handleChange = (selectedOption) => {
		this.props.onSelect(selectedOption)
	}
	
  render() {
    const { selectedMarket } = this.props;
    return (
			<Select
				className='marketSelector'
        value={selectedMarket}
        onChange={this.handleChange}
				options={options}
      />
    );
  }
}

MarketSelector.propTypes = propTypes;
export default MarketSelector;