import React from 'react'
import { mount } from 'enzyme'
import { ApiKey } from './ApiKey'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'
import Authorize from './Authorize'
import IconButton from '@material-ui/core/IconButton'

describe('render', () => {
  it('renders', () => {
    const apikey = mount(<ApiKey onSubmit={() => {}} />)
    expect(apikey).toBeDefined()
  })
})
describe('functionality', () => {
  it('shows lock open when mldfn exists', () => {
    const apikey = mount(
      <ApiKey onSubmit={() => {}} mdlfn={{ hello: 'world' }} />
    )
    expect(apikey.find(LockOpen).length).toEqual(1)
  })
  it('shows lock closed when mldfn does not exist', () => {
    const apikey = mount(<ApiKey onSubmit={() => {}} mdlfn={undefined} />)
    expect(apikey.find(Lock).length).toEqual(1)
  })
  it('shows Authorize on open', () => {
    const apikey = mount(<ApiKey onSubmit={() => {}} mdlfn={undefined} />)
    expect(apikey.find(Authorize).length).toEqual(0)
    apikey
      .find(IconButton)
      .props()
      .onClick()
    apikey.update()
    expect(apikey.find(Authorize).length).toEqual(1)
  })
  it('correctly submits', () => {
    const submit = jest.fn()
    const apikey = mount(
      <ApiKey onSubmit={submit} mdlfn={{ hello: 'world' }} />
    )
    apikey
      .find(IconButton)
      .props()
      .onClick()
    apikey.update()
    const auth = apikey.find(Authorize)
    expect(auth.length).toEqual(1)
    auth.props().onSubmit()
    apikey.update()
    expect(submit.mock.calls.length).toEqual(1)
  })
})
