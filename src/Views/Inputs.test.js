import React from 'react'
import { mount } from 'enzyme'
import Async from 'react-async'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from '../Reducers'
import { Inputs, mapDispatchToProps } from './Inputs'
import {
  UPDATE_API,
  SET_ALL_REFRESH,
  SELECT_MODEL,
  UPDATE_MARKET_CONSTRAINTS,
  UPDATE_CONSTRAINTS,
  UPDATE_DENSITY,
  UPDATE_RISK_METRIC,
  UPDATE_OPTIONS
} from '../Actions/constants'
import TextField from '@material-ui/core/TextField'
import Form from '../Components/Form'

const updateFields = () => () => Promise.resolve('hello')
const updateAllGraphs = () => () => Promise.resolve('hello')
describe('render', () => {
  it('renders', () => {
    const store = createStore(modelApp)
    const inputs = mount(
      <Provider store={store}>
        <Inputs
          selected="model"
          updateFields={updateFields}
          updateAllGraphs={updateAllGraphs}
        />
      </Provider>
    )
    expect(inputs).toBeDefined()
  })
})
describe('functionality', () => {
  let store
  beforeEach(() => {
    store = createStore(modelApp)
    store.dispatch({
      type: UPDATE_API,
      value: 'my_api'
    })
  })
  it('shows form with constraints', done => {
    const inputs = mount(
      <Provider store={store}>
        <Inputs
          selected="model"
          updateFields={updateFields}
          updateAllGraphs={updateAllGraphs}
          modelConstraints={{ model: { upper: 4, lower: 2 } }}
          marketConstraints={{
            model: { upper: 4, lower: 2 },
            asset: { upper: 4, lower: 2 }
          }}
        />
      </Provider>
    )
    expect(inputs.find(Async).length).toEqual(1)
    setTimeout(() => {
      inputs.update()
      expect(inputs.find(Form).length).toBeGreaterThan(0)
      done()
    }, 30)
  })
  it('shows textfield with constraints', done => {
    const inputs = mount(
      <Provider store={store}>
        <Inputs
          selected="model"
          updateFields={updateFields}
          updateAllGraphs={updateAllGraphs}
          modelConstraints={{ model: { upper: 4, lower: 2 } }}
          marketConstraints={{
            model: { upper: 4, lower: 2 },
            asset: { upper: 4, lower: 2 }
          }}
        />
      </Provider>
    )
    expect(inputs.find(Async).length).toEqual(1)
    setTimeout(() => {
      inputs.update()
      expect(inputs.find(TextField).length).toBeGreaterThan(0)
      done()
    }, 30)
  })
})
const mockRO = {
  model: {
    riskmetric: () => Promise.resolve('hello'),
    options: () => Promise.resolve([{ at_point: 3, value: 4, iv: 5 }]),
    density: () => Promise.resolve('hello'),
    constraints: () => Promise.resolve('hello')
  },
  market: {
    constraints: () => Promise.resolve('hello')
  }
}
describe('mapDispatchToProps', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('correctly calls updateFields', done => {
    const mpInst = mapDispatchToProps(dispatch)
    mpInst.updateFields(
      mockRO,
      { model: { upper: 4, lower: 2 } },
      { model: { upper: 4, lower: 2 }, asset: { upper: 4, lower: 2 } },
      'model'
    )()
    setTimeout(() => {
      expect(dispatch.mock.calls.length).toEqual(3)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: SELECT_MODEL,
        value: 'model'
      })
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: UPDATE_CONSTRAINTS,
        value: { model: { upper: 4, lower: 2 } }
      })
      expect(dispatch.mock.calls[2][0]).toEqual({
        type: UPDATE_MARKET_CONSTRAINTS,
        value: { model: { upper: 4, lower: 2 }, asset: { upper: 4, lower: 2 } }
      })
      done()
    }, 30)
  })
  it('correctly calls updateAllGraphs', done => {
    const mpInst = mapDispatchToProps(dispatch)
    mpInst.updateAllGraphs(mockRO, 'model')({
      modelFields: { model: 3 },
      marketFields: { model: 3, asset: 2 }
    })
    setTimeout(() => {
      expect(dispatch.mock.calls.length).toEqual(4)
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_ALL_REFRESH })
      expect(dispatch.mock.calls[1][0].type).toEqual(UPDATE_DENSITY)
      expect(dispatch.mock.calls[2][0].type).toEqual(UPDATE_RISK_METRIC)
      expect(dispatch.mock.calls[3][0].type).toEqual(UPDATE_OPTIONS)
      done()
    }, 30)
  })
})
