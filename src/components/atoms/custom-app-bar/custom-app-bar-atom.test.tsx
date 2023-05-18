import React from 'react';
import { shallow } from 'enzyme';
import AppBar from './custom-app-bar.atom';
import CustomToolbar from '../drawer/drawer.atoms';

describe('AppBar component', () => {
	it('renders without crashing', () => {
		const handleDrawerOpen = jest.fn();
		const wrapper = shallow(<AppBar open={false} handleDrawerOpen={handleDrawerOpen} />);
		expect(wrapper.exists()).toBe(true);
	});

	it('renders CustomToolbar component', () => {
		const handleDrawerOpen = jest.fn();
		const wrapper = shallow(<AppBar open={false} handleDrawerOpen={handleDrawerOpen} />);
		expect(wrapper.find(CustomToolbar).length).toBe(2);
	});

	it('renders Hidden components', () => {
		const handleDrawerOpen = jest.fn();
		const wrapper = shallow(<AppBar open={false} handleDrawerOpen={handleDrawerOpen} />);
		expect(wrapper.find('Hidden').length).toBe(2);
	});
});
