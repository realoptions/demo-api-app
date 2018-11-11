import models from './models'
import mdlfn from './mdlfn'
import constraints from './constraints'
import chartData from './chartData'
import { combineReducers } from 'redux'

export default combineReducers({
  models,
  mdlfn,
  constraints,
  chartData
})
