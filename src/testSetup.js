import Enzyme from 'enzyme';
import 'babel-polyfill'; // https://github.com/facebook/jest/issues/3687
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });