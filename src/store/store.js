import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import CryptoApp from './rootReducer';

let apiUrl;
if(process.env.NODE_ENV === 'development') {
	apiUrl = 'http://208.68.36.85:80';
} else {
	apiUrl = 'http://208.68.36.85:80';
}
console.log('api url', apiUrl);

	const socket = io(apiUrl);
	const socketIoMiddleware = createSocketIoMiddleware(socket, 'orders/');	
	const middlewareEnhancer = applyMiddleware(socketIoMiddleware);
	const storeEnhancers = [middlewareEnhancer];
	const composedEnhancer = compose(...storeEnhancers);

	const store = createStore(
		CryptoApp,
		composedEnhancer
	);

export default store;