import React from 'react'
import { mount } from 'enzyme'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { MenuBar, mapDispatchToProps } from './MenuBar'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {
  SELECT_MODEL,
  UPDATE_CONSTRAINTS,
  UPDATE_MARKET_CONSTRAINTS
} from '../Actions/constants'
import reducer from '../Reducers'
let store
beforeEach(() => {
  store = createStore(reducer)
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
const onSelect = () => {}
describe('render', () => {
  it('renders', () => {
    const options = [{ name: 'hello', label: 'Hello' }]
    const m = mount(
      <Provider store={store}>
        <MenuBar
          options={options}
          onSelect={onSelect}
          selected="hello"
          mdlfn={mockRO}
        />
      </Provider>
    )
    expect(m).toBeDefined()
  })
})
describe('functionality', () => {
  it('has a vertical menu button', () => {
    const options = [{ name: 'hello', label: 'Hello' }]
    const m = mount(
      <Provider store={store}>
        <MenuBar
          options={options}
          onSelect={onSelect}
          selected="hello"
          mdlfn={mockRO}
        />
      </Provider>
    )
    expect(m.find(MoreVertIcon).length).toEqual(1)
  })
  it('menu has the 3 models', () => {
    const options = [
      {
        name: 'heston',
        label: 'Heston'
      },
      {
        name: 'cgmy',
        label: 'CGMY'
      },
      {
        name: 'merton',
        label: 'Merton'
      }
    ]
    const m = mount(
      <Provider store={store}>
        <MenuBar
          options={options}
          onSelect={onSelect}
          selected="heston"
          mdlfn={mockRO}
        />
      </Provider>
    )
    m.find(IconButton)
      .at(1)
      .simulate('click')
    const menuItems = m.find(MenuItem)
    expect(menuItems.length).toEqual(options.length)
    menuItems.forEach(node => {
      expect(options.find(({ label }) => label === node.text())).toBeDefined()
    })
  })
  it('menu correctly selects new menu item', () => {
    const options = [
      {
        name: 'heston',
        label: 'Heston'
      },
      {
        name: 'cgmy',
        label: 'CGMY'
      },
      {
        name: 'merton',
        label: 'Merton'
      }
    ]
    const onSelect = jest.fn()
    const m = mount(
      <Provider store={store}>
        <MenuBar
          options={options}
          onSelect={onSelect}
          selected="heston"
          mdlfn={mockRO}
        />
      </Provider>
    )
    const e = { currentTarget: 'hello' }
    m.find(IconButton)
      .at(1)
      .simulate('click')
    const cgmyMenuItem = m.find(MenuItem).at(1) //cgmy
    console.log(cgmyMenuItem.html())
    cgmyMenuItem.simulate('click', { target: { innerText: 'CGMY' } })
    expect(onSelect.mock.calls.length).toEqual(1)
    expect(onSelect.mock.calls[0][0]).toEqual('heston')
    expect(onSelect.mock.calls[0][1]).toEqual('cgmy')
    expect(onSelect.mock.calls[0][3]).toEqual(undefined)
  })
})
describe('mapDispatchToProps', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })
  it('updates fields if selected is not equal to value', done => {
    const mInst = mapDispatchToProps(dispatch)
    mInst.onSelect('value1', 'model', mockRO, {
      model: { upper: 4, lower: 2 },
      asset: { upper: 4, lower: 2 }
    })
    setTimeout(() => {
      expect(dispatch.mock.calls.length).toEqual(3)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: SELECT_MODEL,
        value: 'model'
      })
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: UPDATE_CONSTRAINTS,
        value: 'hello'
      })
      expect(dispatch.mock.calls[2][0]).toEqual({
        type: UPDATE_MARKET_CONSTRAINTS,
        value: { model: { upper: 4, lower: 2 }, asset: { upper: 4, lower: 2 } }
      })
      done()
    }, 30)
  })
  it('does not update fields if selected is equal to value', done => {
    const mInst = mapDispatchToProps(dispatch)
    mInst.onSelect('value1', 'value1', mockRO, {
      model: { upper: 4, lower: 2 },
      asset: { upper: 4, lower: 2 }
    })
    setTimeout(() => {
      expect(dispatch.mock.calls.length).toEqual(0)
      done()
    }, 30)
  })
})
