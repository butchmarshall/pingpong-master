import createSagaMiddleware, { END } from 'redux-saga';
import _ from 'lodash';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';

import apiMiddleware from '../middleware/api_middleware';

import rootReducers from '../reducers/index';
import rootSaga from '../sagas'

const getStore = (initialState = {}) => {
	const sagaMiddleware = createSagaMiddleware();

	const preloadedState = rootReducers(initialState, {
		type: "REHYDRATE"
	});

	const store = createStore(
		rootReducers,
		preloadedState,
		compose(
			applyMiddleware(
				sagaMiddleware, // lets us run sagas
				apiMiddleware(window.fetch), // intercept API calls
			),
		)
	);
	store.runSaga = sagaMiddleware.run;
	store.runSaga(rootSaga);

	store.close = () => {
		store.dispatch(END)
	};

	return store;
};

export default getStore;