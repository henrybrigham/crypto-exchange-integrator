import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import MarketSelector from '../MarketSelector';
Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
		selectedMarket: {
			value: 'ETH/BTC',
			label: 'ETH/BTC'
		},
		onSelect: jest.fn()
	},
    propOverrides
  );

  const wrapper = mount(<MarketSelector {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<MarketSelector />', () => {
	const { wrapper, props } = setup();

  it('renders', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('handleChange calls props.onSelect', () => {
		wrapper.instance().handleChange({
			value: 'ETH/BTC',
			label: 'ETH/BTC'
		})
		expect(props.onSelect).toHaveBeenCalled();
	});

	it('renders Select tag', () => {
    expect(wrapper.find('Select')).toHaveLength(1);
	});
});

