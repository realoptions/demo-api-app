import React from 'react'
import { mount } from 'enzyme'
import Async from 'react-async'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from '../Reducers'
import { Inputs } from './Inputs'
import { UPDATE_API } from '../Actions/constants'
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
          constraints={{ model: { upper: 4, lower: 2 } }}
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
          constraints={{ model: { upper: 4, lower: 2 } }}
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
