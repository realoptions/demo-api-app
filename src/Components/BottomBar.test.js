import React from 'react'
import { mount } from 'enzyme'
import BottomBar, { chooseSelected } from './BottomBar'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import DensityChart from '../Views/DensityChart'
describe('render', () => {
  it('renders', () => {
    const nak = mount(
      <Router initialEntries={['/density']}>
        <Route to="/:selected" component={BottomBar} />
      </Router>
    )
    expect(nak).toBeDefined()
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
