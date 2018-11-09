import { combineReducers } from 'redux'
import { SELECT_MODEL } from '../Actions/constants'
const initState = [
  {
    name: 'heston',
    label: 'Heston'
  },
  {
    name: 'cgmy',
    label: 'CGMY'
  },
  {
    name: 'merton',
    label: 'Merton'
  }
]
const initSelect = 'heston'

const options = (state = initState) => {
  return state
}
const selected = (state = initSelect, action) => {
  switch (action.type) {
    case SELECT_MODEL:
      return action.value
    default:
      return state
  }
}
export default combineReducers({
  options,
  selected
})
