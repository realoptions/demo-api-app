import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from '../Reducers'
import DC from 'option-charts/Density'
import DensityChart from './DensityChart'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Theme from '../Themes'
import { UPDATE_API } from '../Actions/constants'
const theme = createMuiTheme(Theme)
describe('render', () => {
  it('renders', () => {
    const store = createStore(modelApp)
    const chart = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <DensityChart />
        </MuiThemeProvider>
      </Provider>
    )
    expect(chart).toBeDefined()
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
  it('shows DensityChart', () => {
    const chart = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <DensityChart />
        </MuiThemeProvider>
      </Provider>
    )
    expect(chart.find(DC).length).toEqual(1)
  })
})
