import { combineReducers } from 'redux'
import {
  UPDATE_RISK_METRIC,
  UPDATE_OPTIONS,
  UPDATE_DENSITY
} from '../Actions/constants'

const genericType = (defaultState, type) => (state = defaultState, action) => {
  switch (action.type) {
    case type:
      return action.value
    default:
      return state
  }
}
export const riskMetric = genericType(
  { expected_shortfall: 0, value_at_risk: 0 },
  UPDATE_RISK_METRIC
)
export const option = genericType({ put: [], call: [], iv: [] }, UPDATE_OPTIONS)
export const density = genericType([], UPDATE_DENSITY)
export default combineReducers({
  riskMetric,
  option,
  density
})
