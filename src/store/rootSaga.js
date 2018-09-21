import { all } from 'redux-saga/effects';
// import BookService from './BookService';
import watchBookOrdersSaga from './bookSaga';

export default function* rootSaga() {
  yield all([watchBookOrdersSaga()]);
}