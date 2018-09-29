import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import BookOrder from '../BookOrder';
Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({
		bookOrder: {
			Exchange: 'bittrex',
			Rate: 0.33034,
			Quantity: 34
		}
	},
    propOverrides
  );

  const wrapper = shallow(<BookOrder {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<BookOrder />', () => {
  it('renders', () => {
		const { wrapper, props } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it('renders correct logo', () => {
		const { wrapper, props } = setup(
			{
				bookOrder: {
					Exchange: 'poloniex',
					Rate: 0.33034,
					Quantity: 34
				}
			}
		);

		const imgSource = wrapper.find('img').prop('src');
    expect(imgSource).toBe('poloniexLogo.svg');
	});

	it('renders bittrexLogo logo', () => {
		const { wrapper, props } = setup(
			{
				bookOrder: {
					Exchange: 'bittrex',
					Rate: 0.33034,
					Quantity: 34
				}
			}
		);

		const imgSource = wrapper.find('img').prop('src');
    expect(imgSource).toBe('bittrexLogo.svg');
	});
});

