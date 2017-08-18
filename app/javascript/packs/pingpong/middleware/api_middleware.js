
const apiMiddleware = (fetcher) => (store) => (next) => (action) => {
	if (action.type === 'API_REQUEST') {
		const state = store.getState();
		let {payload: { url, params }} = action;

		params = (typeof(params) != "object")? {} : params;
		params.headers = (typeof(params.headers) != "object") ? {} : params.headers;

		// Unless otherwise specified, request v1.0 of the API
		if (!params.headers['Accept']) {
			params.headers['Accept'] = 'application/vnd.pingpong.v1.0+json';
		}

		const authentication = state.authentication;
		// We are currently signed in
		if (authentication) {
			for(var k in authentication) {
				// Dont overwrite explicitly passed headers
				if (!params.headers[k]) {
					params.headers[k] = authentication[k];
				}
			}
		}

		return fetcher(`${url}`, params);
	} else {
		return next(action);
	}
};

export default apiMiddleware;