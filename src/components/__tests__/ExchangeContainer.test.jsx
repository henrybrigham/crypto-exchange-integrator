import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import {TestableExchangeContainer as ExchangeContainer} from '../ExchangeContainer';
Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
		bookOrders: {
			bittrexOrders: {},
			poloniexOrders: {}
		},
		fetchBookOrders: jest.fn(),
		isFetching: true,
		error: false
	},
    propOverrides
  );

  const wrapper = shallow(<ExchangeContainer {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<ExchangeContainer />', () => {
  it('renders', () => {
		const { wrapper, props } = setup();
		expect(wrapper.exists()).toBe(true);
	});
});

