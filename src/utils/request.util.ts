import * as interfaces from '../interfaces';

export default (configuration: interfaces.request.IConfiguration) => {
	const options: {
		method?: string,
		body?: any,
		headers?: any,
	} = {
		headers: configuration.headers || {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: configuration.method || 'GET',
		body: JSON.stringify({ ...configuration.body }) || JSON.stringify({}),
	};

	if (options.method === 'GET') {
		delete options.body;
	}

	return fetch(
		`${'http://ec2-18-224-135-141.us-east-2.compute.amazonaws.com:3002'}/${configuration.url}`,
		{ ...options },
	)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => { throw error; });
};
