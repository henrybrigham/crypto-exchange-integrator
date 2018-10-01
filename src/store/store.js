import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import CryptoApp from './rootReducer';

let apiUrl;
console.log('**', process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
	apiUrl = 'http://localhost:8000';
} else {
	apiUrl = 'https://bittloniex-exchange.herokuapp.com/';
}

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