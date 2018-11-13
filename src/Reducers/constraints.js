import {
  UPDATE_CONSTRAINTS,
  UPDATE_MARKET_CONSTRAINTS
} from '../Actions/constants'
import { combineReducers } from 'redux'
const genericConstraints = type => (state = null, action) => {
  switch (action.type) {
    case type:
      return action.value
    default:
      return state
  }
}

const modelConstraints = genericConstraints(UPDATE_CONSTRAINTS)
const marketConstraints = genericConstraints(UPDATE_MARKET_CONSTRAINTS)

export default combineReducers({
  modelConstraints,
  marketConstraints
})
