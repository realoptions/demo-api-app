import React from 'react'
import { mount } from 'enzyme'
import BottomBar, { chooseSelected } from './BottomBar'
import Badge from '@material-ui/core/Badge'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../Reducers'
import { SET_ALL_REFRESH } from '../Actions/constants'
describe('functionality', () => {
  let store
  beforeEach(() => {
    store = createStore(reducer)
  })
  it('renders', () => {
    const nak = mount(
      <Provider store={store}>
        <Router initialEntries={['/density']}>
          <Route to="/:selected" component={BottomBar} />
        </Router>
      </Provider>
    )
    expect(nak).toBeDefined()
  })
  it('shows no badges if none refreshed', () => {
    const nak = mount(
      <Provider store={store}>
        <Router initialEntries={['/density']}>
          <Route to="/:selected" component={BottomBar} />
        </Router>
      </Provider>
    )
    nak.find(Badge).forEach(v => {
      expect(v.props().color).toEqual('default')
      expect(v.props().badgeContent).toEqual(false)
    })
  })
  it('shows badge if all refreshed', () => {
    store.dispatch({
      type: SET_ALL_REFRESH
    })
    const nak = mount(
      <Provider store={store}>
        <Router initialEntries={['/density']}>
          <Route to="/:selected" component={BottomBar} />
        </Router>
      </Provider>
    )
    nak.find(Badge).forEach(v => {
      expect(v.props().color).toEqual('secondary')
      expect(v.props().badgeContent).toEqual(1)
    })
  })
})
describe('chooseSelected', () => {
  it('returns 0 if nothing matches', () => {
    expect(chooseSelected('hello')).toEqual(0)
  })
  it('returns 0 if matches inputs', () => {
    expect(chooseSelected('inputs')).toEqual(0)
  })
  it('returns 1 if matches density', () => {
    expect(chooseSelected('density')).toEqual(1)
  })
  it('returns 2 if matches options', () => {
    expect(chooseSelected('options')).toEqual(2)
  })
})
