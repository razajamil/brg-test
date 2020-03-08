import { createStore, applyMiddleware } from 'redux'

import { compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../reducers'
import rootSaga from '../sagas'

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

window.store = store

sagaMiddleware.run(rootSaga)

export default store
