import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import CryptoApp from './rootReducer';

let apiUrl;
if(process.env.NODE_ENV === 'development') {
	apiUrl = 'https://bittloniex-api.herokuapp.com';
} else {
	apiUrl = 'https://bittloniex-api.herokuapp.com';
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