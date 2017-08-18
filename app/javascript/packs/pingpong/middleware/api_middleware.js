
const apiMiddleware = (fetcher) => (store) => (next) => (action) => {
	if (action.type === 'API_REQUEST') {
		const state = store.getState();
		let {payload: { url, params }} = action;

		params = (typeof(params) != "object")? {} : params;
		params.headers = (typeof(params.headers) != "object") ? {} : params.headers;

		return fetcher(`${url}`, params);
	} else {
		return next(action);
	}
};

export default apiMiddleware;