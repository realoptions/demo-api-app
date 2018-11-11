import {
  SELECT_MODEL,
  UPDATE_CONSTRAINTS,
  UPDATE_RISK_METRIC,
  UPDATE_DENSITY,
  UPDATE_OPTIONS
} from './constants'
//exported for testing
export const getCacheResult = (existingValue, fn) => {
  if (existingValue) {
    return Promise.resolve(existingValue)
  } else {
    return fn()
  }
}
export const updateFields = ({
  dispatch,
  selectedModel,
  realOptions,
  existingValue
}) => {
  dispatch({
    type: SELECT_MODEL,
    value: selectedModel
  })
  if (!realOptions) {
    return
  }
  return getCacheResult(
    existingValue,
    realOptions[selectedModel].constraints
  ).then(value => {
    dispatch({
      type: UPDATE_CONSTRAINTS,
      value
    })
  })
}
export const updateDensity = ({
  dispatch,
  selectedModel,
  parameters,
  realOptions
}) => {
  if (!realOptions) {
    return
  }
  return realOptions[selectedModel].density(parameters).then(value => {
    dispatch({
      type: UPDATE_DENSITY,
      value
    })
  })
}
export const updateRiskMetrics = ({
  dispatch,
  selectedModel,
  parameters,
  realOptions
}) => {
  if (!realOptions) {
    return
  }
  return realOptions[selectedModel].riskmetric(parameters).then(value => {
    dispatch({
      type: UPDATE_RISK_METRIC,
      value
    })
  })
}
export const updateOptions = ({
  dispatch,
  selectedModel,
  parameters,
  sensitivityType,
  realOptions
}) => {
  if (!realOptions) {
    return
  }
  return Promise.all([
    realOptions[selectedModel].options(
      parameters,
      'call',
      sensitivityType,
      true
    ),
    realOptions[selectedModel].options(parameters, 'put', sensitivityType, true)
  ]).then(([call, put]) => {
    dispatch({
      type: UPDATE_OPTIONS,
      value: { call, put }
    })
  })
}
export const updateAllGraphs = ({
  dispatch,
  selectedModel,
  parameters,
  optionType,
  sensitivityType,
  realOptions
}) =>
  Promise.all([
    updateDensity({
      dispatch,
      selectedModel,
      parameters,
      realOptions
    }),
    updateRiskMetrics({
      dispatch,
      selectedModel,
      parameters,
      realOptions
    }),
    updateOptions({
      dispatch,
      selectedModel,
      parameters,
      optionType,
      sensitivityType,
      realOptions
    })
  ])
