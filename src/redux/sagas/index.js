import { all } from 'redux-saga/effects'
import { watchForAPIAction } from './apiSaga'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchForAPIAction()])
}
