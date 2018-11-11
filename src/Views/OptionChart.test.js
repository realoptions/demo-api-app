import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from '../Reducers'
import OC from 'option-charts/PutCall'
import IV from 'option-charts/ImpliedVolatility'
import OptionChart from './OptionChart'
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
          <OptionChart />
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
  it('shows PutCallChart', () => {
    const chart = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <OptionChart />
        </MuiThemeProvider>
      </Provider>
    )
    expect(chart.find(OC).length).toEqual(1)
  })
  it('shows Volatility Chart', () => {
    const chart = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <OptionChart />
        </MuiThemeProvider>
      </Provider>
    )
    expect(chart.find(IV).length).toEqual(1)
  })
})
