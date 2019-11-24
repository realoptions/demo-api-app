import {
  SELECT_MODEL,
  UPDATE_CONSTRAINTS,
  UPDATE_RISK_METRIC,
  UPDATE_DENSITY,
  UPDATE_OPTIONS,
  UPDATE_MARKET_CONSTRAINTS
} from './constants'
//exported for testing
export const getCacheResult = (existingValue, fn) => {
  if (existingValue) {
    return Promise.resolve(existingValue)
  } else {
    return fn()
  }
}
export const filterIV = callArray =>
  callArray.reduce(
    (aggr, { at_point, value, iv }) => ({
      call: [...aggr.call, { at_point, value }],
      iv: [...aggr.iv, { at_point, iv }]
    }),
    { call: [], iv: [] }
  )

export const updateFields = ({
  dispatch,
  selectedModel,
  realOptions,
  existingModelValue,
  existingMarketValue
}) => {
  dispatch({
    type: SELECT_MODEL,
    value: selectedModel
  })
  if (!realOptions) {
    return
  }
  return Promise.all([
    getCacheResult(
      existingModelValue,
      realOptions[selectedModel].constraints
    ).then(value => {
      dispatch({
        type: UPDATE_CONSTRAINTS,
        value
      })
      return value
    }),
    getCacheResult(existingMarketValue, realOptions.market.constraints).then(
      value => {
        dispatch({
          type: UPDATE_MARKET_CONSTRAINTS,
          value
        })
        return value
      }
    )
  ])
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
    realOptions[selectedModel].options(parameters, 'put', sensitivityType)
  ]).then(([callAndIV, put]) => {
    const { call, iv } = filterIV(callAndIV)
    dispatch({
      type: UPDATE_OPTIONS,
      value: { call, put, iv }
    })
  })
}
export const updateAllGraphs = ({
  dispatch,
  selectedModel,
  parameters,
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
      sensitivityType,
      realOptions
    })
  ])
