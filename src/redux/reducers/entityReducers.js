import { produce } from 'immer'
import entities from '../../entities'
import { mapObject, stringHasValue, arrayHasValue } from '../../helpers'

const createEntityReducers = () => {
  const reducers = {}

  mapObject(entities, entity => {
    reducers[entity.id] = (state = entity.initialState, action) => {
      // api action result
      if (
        action.meta &&
        stringHasValue(action.meta.entityID) &&
        action.meta.entityID === entity.id &&
        stringHasValue(action.meta.entityActionType) &&
        stringHasValue(action.meta.entityActionTypeResult)
      ) {
        if (stringHasValue(action.meta.entityActionTypeResult)) {
          const { reducer } = entity[action.meta.entityActionType][
            action.meta.entityActionTypeResult
          ]
          return produce(state, draft => reducer(draft, action))
        }
      }

      // normal action
      if (
        action.meta &&
        action.meta.entityID === entity.id &&
        stringHasValue(action.meta.entityActionType) &&
        !stringHasValue(action.meta.entityActionTypeResult)
      ) {
        let returnState = state

        const { reducer } = entity[action.meta.entityActionType]
        if (reducer) {
          returnState = produce(state, draft => reducer(draft, action))
        }

        return returnState
      }

      // shared action
      if (
        action.meta &&
        arrayHasValue(action.meta.entityActionTypeResultShare)
      ) {
        let returnState = state

        action.meta.entityActionTypeResultShare.map(share => {
          if (share.entityID === entity.id) {
            const { action: shareAction, reducer } = entities[share.entityID][
              share.action
            ]

            if (reducer) {
              returnState = produce(state, draft =>
                reducer(draft, shareAction(share.params))
              )
            }
          }
        })

        return returnState
      }

      return state
    }
  })

  return reducers
}

export default createEntityReducers
