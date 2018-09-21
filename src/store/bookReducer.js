export function orders(state = {}, action){
  switch (action.type) {
  case 'orders:FETCH_ORDERS_SUCCESS':
    return {
			bookOrder: action.payload,
			isFetching: false,
			error: false
    };
	case 'orders:FETCH_ORDERS_REQUEST':
		return {
			...state,
			isFetching: true,
		};
	case 'orders:FETCH_ORDERS_FAILURE':
		return {
			...state,
			error: false
		};
  default: return state;
  }
}