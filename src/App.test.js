import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import App from './App';
Enzyme.configure({ adapter: new Adapter() });

const setup = propOverrides => {
  const props = Object.assign({},
    propOverrides
  );

  const wrapper = shallow(<App {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('<App />', () => {
	const { wrapper } = setup();
  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
	});
});


