import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';

const store = createStore(
	reducers,
	applyMiddleware(thunk),
);

describe('App Component', () => {
	const TestComponent = (
		<Provider store={store}>
			<App />
		</Provider>
	);

	it('should render it', () => {
		const { container } = render(TestComponent);
		expect(container).toMatchSnapshot();
	});
});
