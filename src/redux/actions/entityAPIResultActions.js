// Functions to generate resulting actions from api actions i.e loading/success/tasks

// Tries to look for action object on entity/api_action/loading-success-fail/action

// If not available, returns a default loading/success/fail action object that just copies payload
// and meta and changes the result type

import {
  toEntityAPIResultLoadingAction,
  toEntityAPIResultSuccessAction,
  toEntityAPIResultFailAction
} from './entityActions'

import entities from '../../entities'

export const ENTITY_ACTION_RESULT_LOADING = 'loading'
export const ENTITY_ACTION_RESULT_SUCCESS = 'success'
export const ENTITY_ACTION_RESULT_FAIL = 'error'

export const getEntityAPILoadingAction = (payload, meta) => {
  let action = {}

  const actionGenerator =
    entities[meta.entityID][meta.entityActionType][ENTITY_ACTION_RESULT_LOADING]
      .action

  if (actionGenerator) {
    action = actionGenerator(payload, meta)
    action.meta.entityActionTypeResult = ENTITY_ACTION_RESULT_LOADING
  } else {
    action = toEntityAPIResultLoadingAction({ payload, meta })
  }

  return action
}

export const getEntityAPISuccessAction = (payload, meta) => {
  let action = {}

  const actionGenerator =
    entities[meta.entityID][meta.entityActionType][ENTITY_ACTION_RESULT_SUCCESS]
      .action

  if (actionGenerator) {
    action = actionGenerator(payload, meta)
    action.meta.entityActionTypeResult = ENTITY_ACTION_RESULT_SUCCESS
  } else {
    action = toEntityAPIResultSuccessAction({ payload, meta })
  }

  return [action]
}

export const getEntityAPIFailAction = (payload, meta) => {
  let action = {}
  const actionGenerator =
    entities[meta.entityID][meta.entityActionType][ENTITY_ACTION_RESULT_FAIL]
      .action

  if (actionGenerator) {
    action = actionGenerator(payload, meta)
    action.meta.entityActionTypeResult = ENTITY_ACTION_RESULT_FAIL
  } else {
    action = toEntityAPIResultFailAction({ payload, meta })
  }

  return action
}

export const getEntityAPIActionAPICall = (payload, meta) => {
  return () =>
    entities[meta.entityID][meta.entityActionType].apiCall(
      meta.entityActionParams
    )
}
