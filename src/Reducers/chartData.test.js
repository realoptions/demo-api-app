import { riskMetric, option, density } from './chartData'
import {
  UPDATE_RISK_METRIC,
  UPDATE_OPTIONS,
  UPDATE_DENSITY
} from '../Actions/constants'
describe('risk metric data', () => {
  it('returns 0 by default', () => {
    expect(riskMetric(undefined, { type: 'something' })).toEqual({
      value_at_risk: 0,
      expected_shortfall: 0
    })
  })
  it('assigns value at risk and expected shortfall', () => {
    expect(
      riskMetric(undefined, {
        type: UPDATE_RISK_METRIC,
        value: { expected_shortfall: 4, value_at_risk: 3 }
      })
    ).toEqual({
      value_at_risk: 3,
      expected_shortfall: 4
    })
  })
  it('does nothing if type is not update risk metric and state already exists', () => {
    expect(
      riskMetric(
        { expected_shortfall: 4, value_at_risk: 3 },
        { type: 'something' }
      )
    ).toEqual({
      value_at_risk: 3,
      expected_shortfall: 4
    })
  })
})
describe('option data', () => {
  const testData = [
    {
      at_point: 4,
      value: 3
    }
  ]
  it('returns empty array by default', () => {
    expect(option(undefined, { type: 'something' })).toEqual({
      put: [],
      call: []
    })
  })
  it('assigns array', () => {
    expect(
      option(undefined, {
        type: UPDATE_OPTIONS,
        value: { put: testData, call: testData }
      })
    ).toEqual({ put: testData, call: testData })
  })
  it('does nothing if type is not update option and state already exists', () => {
    expect(
      option({ put: testData, call: testData }, { type: 'something' })
    ).toEqual({ put: testData, call: testData })
  })
})
describe('density data', () => {
  it('returns empty array by default', () => {
    expect(density(undefined, { type: 'something' })).toEqual([])
  })
  it('assigns array', () => {
    expect(
      density(undefined, {
        type: UPDATE_DENSITY,
        value: [
          {
            at_point: 4,
            value: 3
          }
        ]
      })
    ).toEqual([
      {
        at_point: 4,
        value: 3
      }
    ])
  })
  it('does nothing if type is not update density and state already exists', () => {
    expect(
      density(
        [
          {
            at_point: 4,
            value: 3
          }
        ],
        { type: 'something' }
      )
    ).toEqual([
      {
        at_point: 4,
        value: 3
      }
    ])
  })
})
