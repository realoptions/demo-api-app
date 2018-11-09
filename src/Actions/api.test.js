import {
  getCacheResult,
  updateFields,
  updateDensity,
  updateRiskMetrics,
  updateOptions,
  updateAllGraphs
} from './api'
import {
  SELECT_MODEL,
  UPDATE_CONSTRAINTS,
  UPDATE_DENSITY,
  UPDATE_RISK_METRIC,
  UPDATE_OPTIONS
} from './constants'
const mockRO = {
  model: {
    riskmetric: () => Promise.resolve('hello'),
    options: () => Promise.resolve('hello'),
    density: () => Promise.resolve('hello'),
    constraints: () => Promise.resolve('hello')
  }
}
describe('getCacheResult', () => {
  it('returns existing value if exists', () => {
    return getCacheResult('hello').then(result =>
      expect(result).toEqual('hello')
    )
  })
  it('returns function if no existin value', () => {
    return getCacheResult(null, () => Promise.resolve('hello')).then(result =>
      expect(result).toEqual('hello')
    )
  })
})
describe('updateFields', () => {
  it('dispatches and returns nothing if no realOptions', () => {
    const dispatch = jest.fn()
    updateFields({ dispatch })
    expect(dispatch.mock.calls.length).toBe(1)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SELECT_MODEL,
      value: undefined
    })
  })
  it('dispatches twice if realOptions', () => {
    const dispatch = jest.fn()
    updateFields({
      dispatch,
      realOptions: mockRO,
      selectedModel: 'model'
    }).then(() => {
      return Promise.all([
        expect(dispatch.mock.calls.length).toBe(2),
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: SELECT_MODEL,
          value: 'model'
        }),
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: UPDATE_CONSTRAINTS,
          value: 'hello'
        })
      ])
    })
  })
})
describe('updateDensity', () => {
  it('returns nothing if no realOptions', () => {
    const dispatch = jest.fn()
    expect(updateDensity({ dispatch })).toBeUndefined()
    expect(dispatch.mock.calls.length).toBe(0)
  })
  it('dispatches once if realOptions', () => {
    const dispatch = jest.fn()
    updateDensity({
      dispatch,
      realOptions: mockRO,
      selectedModel: 'model'
    }).then(() => {
      return Promise.all([
        expect(dispatch.mock.calls.length).toBe(1),
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: UPDATE_DENSITY,
          value: 'hello'
        })
      ])
    })
  })
})
describe('updateRiskMetrics', () => {
  it('returns nothing if no realOptions', () => {
    const dispatch = jest.fn()
    expect(updateRiskMetrics({ dispatch })).toBeUndefined()
    expect(dispatch.mock.calls.length).toBe(0)
  })
  it('dispatches once if realOptions', () => {
    const dispatch = jest.fn()
    updateRiskMetrics({
      dispatch,
      realOptions: mockRO,
      selectedModel: 'model'
    }).then(() => {
      return Promise.all([
        expect(dispatch.mock.calls.length).toBe(1),
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: UPDATE_RISK_METRIC,
          value: 'hello'
        })
      ])
    })
  })
})
describe('updateOptions', () => {
  it('returns nothing if no realOptions', () => {
    const dispatch = jest.fn()
    expect(updateOptions({ dispatch })).toBeUndefined()
    expect(dispatch.mock.calls.length).toBe(0)
  })
  it('dispatches once if realOptions', () => {
    const dispatch = jest.fn()
    updateOptions({
      dispatch,
      realOptions: mockRO,
      selectedModel: 'model'
    }).then(() => {
      return Promise.all([
        expect(dispatch.mock.calls.length).toBe(1),
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: UPDATE_OPTIONS,
          value: 'hello'
        })
      ])
    })
  })
})
describe('updateAllGraphs', () => {
  it('returns nothing if no realOptions', () => {
    const dispatch = jest.fn()
    expect(dispatch.mock.calls.length).toBe(0)
  })
  it('dispatches six times if realOptions', () => {
    const dispatch = jest.fn()
    updateAllGraphs({
      dispatch,
      realOptions: mockRO,
      selectedModel: 'model'
    }).then(() => {
      return expect(dispatch.mock.calls.length).toBe(3)
    })
  })
})
