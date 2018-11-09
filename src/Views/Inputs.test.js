import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from '../Reducers'
import Inputs from './Inputs'
import { UPDATE_CONSTRAINTS, UPDATE_API } from '../Actions/constants'
const store = createStore(modelApp)

describe('render', () => {
  it('renders', () => {
    const inputs = mount(
      <Provider store={store}>
        <Inputs />
      </Provider>
    )
    expect(inputs).toBeDefined()
  })
})
describe('functionality', () => {
  it('shows form with constraints if constraints does not previously exist', () => {
    store.dispatch({
      type: UPDATE_API,
      value: 'my_api'
    })
    const inputs = mount(
      <Provider store={store}>
        <Inputs />
      </Provider>
    )
    expect(inputs.find(TextField).length).toBeGreaterThan(0)
  })
  it('shows form with constraints if constraints previously exists', () => {
    store.dispatch({
      type: UPDATE_API,
      value: 'my_api'
    })
    store.dispatch({
      type: UPDATE_CONSTRAINTS,
      value: { hello: { upper: 5, lower: 2 } }
    })
    const inputs = mount(
      <Provider store={store}>
        <Inputs />
      </Provider>
    )
    expect(inputs.find(TextField).length).toBeGreaterThan(0)
  })
})
