import { SET_ALL_REFRESH, RESET_REFRESH } from '../Actions/constants'
import { combineReducers } from 'redux'
const genericRefresh = key => (state = false, action) => {
  switch (action.type) {
    case SET_ALL_REFRESH:
      return true
    case RESET_REFRESH:
      if (action.value === key) {
        return false
      }
      return state
    default:
      return state
  }
}

const density = genericRefresh('density')
const options = genericRefresh('options')

export default combineReducers({
  density,
  options
})
