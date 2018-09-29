import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import CryptoApp from './rootReducer';

	const socket = io('http://localhost:8000');
	const socketIoMiddleware = createSocketIoMiddleware(socket, 'orders/');	
	const middlewareEnhancer = applyMiddleware(socketIoMiddleware);
	const storeEnhancers = [middlewareEnhancer];
	const composedEnhancer = compose(...storeEnhancers);

	const store = createStore(
		CryptoApp,
		composedEnhancer
	);

export default store;