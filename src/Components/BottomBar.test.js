import React from 'react'
import { mount } from 'enzyme'
import BottomBar from './BottomBar'
import { HashRouter as Router } from 'react-router-dom'
describe('render', () => {
  it('renders', () => {
    const nak = mount(
      <Router>
        <BottomBar />
      </Router>
    )
    expect(nak).toBeDefined()
  })
})
