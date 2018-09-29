import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import Exchange from '../Exchange';
Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
		bookOrders: {},
		fetchBookOrders: jest.fn(),
		isFetching: false,
		error: false
	},
    propOverrides
  );

  const wrapper = mount(<Exchange {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<Exchange />', () => {
	const { wrapper, props } = setup();
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
	});

	it('calls props.fetchBookOrders', () => {
    expect(props.fetchBookOrders).toHaveBeenCalled();
	});
});

describe('Exchange Conditional Rendering', () => {
	const { wrapper, props } = setup({isFetching: true});
  it('renders the loading gif', () => {
    expect(wrapper.find('img')).toHaveLength(1);
	});
});

describe('Local Methods', () => {
	const { wrapper, props } = setup();
  test('calculateVolume returns the correct currency sum', () => {
		const orders = [
			{
				Exchange: "poloniex",
				Quantity: 0.01206248,
				Rate: 0.03506395,
				Type: "bid"
			},
			{
				Exchange: "bittrex",
				Quantity: 0.03333,
				Rate: 0.03506395,
				Type: "bid"
			},
			{
				Exchange: "poloniex",
				Quantity: 4.01206248,
				Rate: 0.03506395,
				Type: "bid"
			}
		];
		const result = wrapper.instance().calculateVolume(orders);
    expect(result).toEqual(4.05745496);
	});

	test('onSelect sets state and calls props.fetchBookOrers', () => {
		const selectedMarket = {
			value: 'XRP/BTC',
			label: 'XRP/BTC'
		}
		wrapper.instance().onSelect(selectedMarket);
    expect(wrapper.state().selectedMarket).toEqual(selectedMarket);
	});

	test('sortBookOrders sorts inputted book orders by Rate', () => {
		const orders = [
			{
				Exchange: "poloniex",
				Quantity: 0.01206248,
				Rate: 0.0456,
				Type: "bid"
			},
			{
				Exchange: "poloniex",
				Quantity: 4.01206248,
				Rate: 0.0234,
				Type: "bid"
			},
			{
				Exchange: "bittrex",
				Quantity: 0.03333,
				Rate: 0.0345,
				Type: "bid"
			}
		];

		const expected = [
			{
				Exchange: "poloniex",
				Quantity: 0.01206248,
				Rate: 0.0456,
				Type: "bid"
			},
			{
				Exchange: "bittrex",
				Quantity: 0.03333,
				Rate: 0.0345,
				Type: "bid"
			},
			{
				Exchange: "poloniex",
				Quantity: 4.01206248,
				Rate: 0.0234,
				Type: "bid"
			}
		];


		const result = wrapper.instance().sortBookOrders(orders);
    expect(result).toEqual(expected);
	});
});

