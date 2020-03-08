import { put, takeEvery, all } from 'redux-saga/effects'
import { isEntityAPIAction } from '../actions/entityActions'
import {
  getEntityAPIActionAPICall,
  getEntityAPILoadingAction,
  getEntityAPISuccessAction,
  getEntityAPIFailAction
} from '../actions/entityAPIResultActions'
import { isAPIAction } from '../actions/apiActions'

import { objectHasValue, stringHasValue } from '../../helpers'

window.apiSagaVars = {}

export function* processAPIAction(action) {
  try {
    if (isEntityAPIAction(action) && !isAPIActionUnderway(action)) {
      try {
        yield put(getEntityAPILoadingAction(action.payload, action.meta))
        const apiCall = getEntityAPIActionAPICall(action.payload, action.meta)
        const apiResponse = yield apiCall()
        if (objectHasValue(apiResponse)) {
          const successActions = getEntityAPISuccessAction(
            apiResponse,
            action.meta
          )
          yield all(successActions.map(successAction => put(successAction)))
        } else {
          const failAction = getEntityAPIFailAction(apiResponse, action.meta)
          console.log(failAction)
          yield put(failAction)
        }
      } catch (err) {
        const css = 'color:red'
        console.log('%c%s', css, err)
        // const failAction = getEntityAPIFailAction(err, action.meta)
        // yield put(failAction)
      }
      endAPIAction(action)
    }
  } catch (err) {
    console.log('%c%s', 'API SAGA: unknown error')
  }
}

export function* watchForAPIAction() {
  yield takeEvery(isAPIAction, processAPIAction)
}

const isAPIActionUnderway = action => {
  const { meta } = action
  let hash = meta.entityID

  Object.keys(meta.entityActionParams).map(key => {
    hash += key + meta.entityActionParams[key]
  })

  const isUnderway = stringHasValue(window.apiSagaVars[hash])

  if (!isUnderway) {
    window.apiSagaVars[hash] = '1'
  }

  return isUnderway
}

const endAPIAction = action => {
  const { meta } = action
  let hash = meta.entityID

  Object.keys(meta.entityActionParams).map(key => {
    hash += key + meta.entityActionParams[key]
  })

  delete window.apiSagaVars[hash]
}
