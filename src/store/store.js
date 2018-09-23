import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import createSagaMiddleware from 'redux-saga';
import CryptoApp from './rootReducer';
import rootSaga from './rootSaga';

	const sagaMiddleware = createSagaMiddleware();
	const socket = io('http://localhost:8000');
	const socketIoMiddleware = createSocketIoMiddleware(socket, 'orders/');	
	const middleware = [sagaMiddleware, logger(), socketIoMiddleware];
	const middlewareEnhancer = applyMiddleware(...middleware);
	const storeEnhancers = [middlewareEnhancer];
	const composedEnhancer = compose(...storeEnhancers);

	const store = createStore(
		CryptoApp,
		composedEnhancer
	);

export default store;