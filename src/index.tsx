import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers';
import theme from './styles/react/theme';

import './styles/css/global-styles.css';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root') as any);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
);

reportWebVitals();
