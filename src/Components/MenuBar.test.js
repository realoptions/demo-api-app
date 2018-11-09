import React from 'react'
import { mount } from 'enzyme'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { MenuBar } from './MenuBar'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../Reducers'
let store
beforeEach(() => {
  store = createStore(reducer)
})
describe('render', () => {
  it('renders', () => {
    const m = mount(
      <Provider store={store}>
        <MenuBar options={[{ name: 'hello', label: 'Hello' }]} />
      </Provider>
    )
    expect(m).toBeDefined()
  })
})
describe('functionality', () => {
  it('has a vertical menu button', () => {
    const m = mount(
      <Provider store={store}>
        <MenuBar options={[{ name: 'hello', label: 'Hello' }]} />
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
        <MenuBar options={options} />
      </Provider>
    )
    m.find(IconButton)
      .at(1)
      .simulate('click')
    const menuItems = m.find(MenuItem)
    expect(menuItems.length).toEqual(options.length)
    menuItems.forEach(node => {
      expect(options.find(v => v === node.text())).toBeDefined()
    })
  })
})
