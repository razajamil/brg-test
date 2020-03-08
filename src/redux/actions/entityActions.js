// Functions to create secular sync/async-loading/success/fail entity actions objects

// WARNING: No dependancies except for ./api, if you introduce dependancies here it might lead to circular dependancy issues

import { objectHasValue, stringHasValue } from '../../helpers'
import {
  toAPIActionType,
  toAPIActionSuccessType,
  toAPIActionLoadingType,
  toAPIActionFailType
} from './apiActions'

export const ENTITY_ACTION_RESULT_LOADING = 'loading'
export const ENTITY_ACTION_RESULT_SUCCESS = 'success'
export const ENTITY_ACTION_RESULT_FAIL = 'error'

export const toEntityAction = (action, entityID) => {
  return {
    ...action,
    type: `${action.type}/${entityID.toUpperCase()}`,
    meta: {
      ...action.meta,
      entityID: entityID,
      entityActionType: action.type,
      entityActionParams: {
        ...(action.meta ? action.meta.entityActionParams : {}),
        ...action.payload
      }
    }
  }
}

export const toEntityAPIAction = (action, entityID) => {
  const entityAction = toEntityAction(action, entityID)
  const entityAPIAction = {
    ...entityAction,
    type: toAPIActionType(entityAction.type)
  }
  return entityAPIAction
}

export const toEntityAPIResultLoadingAction = action => {
  if (!stringHasValue(action.type)) action.type = action.meta.entityActionType
  let returnAction = toEntityAction(action, action.meta.entityID)

  returnAction.type = toAPIActionLoadingType(returnAction.type)
  returnAction.meta.entityActionTypeResult = ENTITY_ACTION_RESULT_LOADING

  return returnAction
}

export const toEntityAPIResultSuccessAction = action => {
  if (!stringHasValue(action.type)) action.type = action.meta.entityActionType
  let returnAction = toEntityAction(action, action.meta.entityID)

  returnAction.type = toAPIActionSuccessType(returnAction.type)
  returnAction.meta.entityActionTypeResult = ENTITY_ACTION_RESULT_SUCCESS

  return returnAction
}

export const toEntityAPIResultFailAction = action => {
  if (!stringHasValue(action.type)) action.type = action.meta.entityActionType
  let returnAction = toEntityAction(action, action.meta.entityID)

  returnAction.type = toAPIActionFailType(returnAction.type)
  returnAction.meta.entityActionTypeResult = ENTITY_ACTION_RESULT_FAIL

  return returnAction
}

export const isEntityAPIAction = action => {
  return (
    objectHasValue(action) &&
    objectHasValue(action.meta) &&
    action.meta.entityActionType
  )
}

export const isEntityAPIActionResult = action =>
  objectHasValue(action) &&
  objectHasValue(action.meta) &&
  stringHasValue(action.meta.entityActionTypeResult)
