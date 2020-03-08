import { objectHasValue } from '../../helpers'

const API_ACTION = 'api/'
const API_ACTION_LOADING = 'api_l/'
const API_ACTION_SUCCESS = 'api_s/'
const API_ACTION_FAIL = 'api_f/'

export const toAPIActionType = type => API_ACTION + type
export const toAPIActionLoadingType = type => API_ACTION_LOADING + type
export const toAPIActionSuccessType = type => API_ACTION_SUCCESS + type
export const toAPIActionFailType = type => API_ACTION_FAIL + type

export const isAPIAction = action =>
  objectHasValue(action) && action.type.startsWith(API_ACTION)

export const isAPILoadingAction = action =>
  isAPIAction(action) && action.meta.entityActionResult === 'loading'

export const isAPISuccessAction = action =>
  isAPIAction(action) && action.meta.entityActionResult === 'success'

export const isAPIFailAction = action =>
  isAPIAction(action) && action.meta.entityActionResult === 'error'

export const toAPIAction = action => ({
  ...action,
  type: toAPIActionType(action.type)
})
