import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import ExchangeHeader from '../ExchangeHeader';
Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
		title: 'Bids',
		totalCurrency: 4530,
		market: 'ETH/BTC'
	},
    propOverrides
  );

  const wrapper = shallow(<ExchangeHeader {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<ExchangeHeader />', () => {
	const { wrapper, props } = setup();

  it('renders', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('renders coin string correctly', () => {
		expect(wrapper.find('.coin').at(0).text()).toEqual('ETH');
	});
});

