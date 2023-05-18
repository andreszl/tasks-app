import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; // o 'enzyme-adapter-react-16' si estás utilizando React 16

configure({ adapter: new Adapter() });
