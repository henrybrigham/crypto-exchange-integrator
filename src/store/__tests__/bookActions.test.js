import {
	GET_BOOK_ORDERS_REQUEST,
	GET_BOOK_ORDERS_SUCCESS,
	GET_BOOK_ORDERS_FAILURE,
	fetchBookOrdersRequest,
	fetchBookOrdersSuccess,
	fetchBookOrdersFailure
} from '../bookActions';

describe('book Actions', () => {
	const orders = {
		poloniexOrders: {},
		bittloniexOrders: {}
	}

  test('fetchBookOrdersRequest returns object', () => {
    const result = fetchBookOrdersRequest();
    expect(result.type).toEqual(GET_BOOK_ORDERS_REQUEST);
  });

  test('fetchBookOrdersSuccess returns object', () => {
    const result = fetchBookOrdersSuccess(orders);
    expect(result.type).toEqual(GET_BOOK_ORDERS_SUCCESS);
    expect(result.orders).toEqual(orders);
  });

  test('fetchBookOrdersFailure returns object', () => {
    const result = fetchBookOrdersFailure();
    expect(result.type).toEqual(GET_BOOK_ORDERS_FAILURE);
  });
});