export const GET_BOOK_ORDERS_REQUEST = 'orders/GET_BOOK_ORDERS_REQUEST';
export const GET_BOOK_ORDERS_SUCCESS = 'orders/GET_BOOK_ORDERS_SUCCESS';
export const GET_BOOK_ORDERS_FAILURE = 'orders/GET_BOOK_ORDERS_FAILURE';

export const fetchBookOrdersRequest = (market) => ({
	type: GET_BOOK_ORDERS_REQUEST,
	market
 });

 export const fetchBookOrdersSuccess = (orders) => ({
	type: GET_BOOK_ORDERS_SUCCESS, orders
 });

 export const fetchBookOrdersFailure = () => ({
	type: GET_BOOK_ORDERS_FAILURE
 });