import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchBookOrdersSuccess,
  fetchBookOrdersFailure,
} from './bookActions';

export function* getBookOrders(BookService) {
  try {
    // const books = yield call(BookService.getBooks);
    // yield put(fetchBookOrdersSuccess(books));
  } catch (e) {
    yield put(fetchBookOrdersFailure(e));
  }
}

export default function* watchBookOrdersSaga(BookService) {
  yield all([takeEvery('orders/GET_BOOK_ORDERS_REQUEST', getBookOrders, BookService)]);
}