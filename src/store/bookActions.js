export function fetchBookOrdersRequest() {
	console.log('request');
  return (dispatch) => {
    dispatch({type: 'orders/GET_BOOK_ORDERS_REQUEST'})
	}
};

export function fetchBookOrdersSuccess(orders) {
	console.log('success');
  return (dispatch) => {
    dispatch({type: 'orders/GET_BOOK_ORDERS_SUCCESS',
		orders})
	}
};

export function fetchBookOrdersFailure() {
	console.log('failure');
  return (dispatch) => {
    dispatch({type: 'orders/GET_BOOK_ORDERS_FAILURE'})
	}
};