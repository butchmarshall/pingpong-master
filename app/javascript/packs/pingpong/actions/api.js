export const API_REQUEST = 'API_REQUEST';

export const apiRequest = (url, params) => ({
	type: API_REQUEST,
	payload: {
		url: url,
		params: params,
	}
});