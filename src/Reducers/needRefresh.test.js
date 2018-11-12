import { SET_ALL_REFRESH, RESET_REFRESH } from '../Actions/constants'
import needRefresh from './needRefresh'
it('defaults to not needing refresh', () => {
  expect(needRefresh(undefined, { type: 'hello' })).toEqual({
    density: false,
    options: false
  })
})
it('sets all to true when setting all', () => {
  expect(needRefresh(undefined, { type: SET_ALL_REFRESH })).toEqual({
    density: true,
    options: true
  })
})
it('sets density to false when Reset', () => {
  expect(
    needRefresh(
      { density: true, options: true },
      { type: RESET_REFRESH, value: 'density' }
    )
  ).toEqual({ density: false, options: true })
})
it('sets options to false when Reset', () => {
  expect(
    needRefresh(
      { density: true, options: true },
      { type: RESET_REFRESH, value: 'options' }
    )
  ).toEqual({ density: true, options: false })
})
it('keeps state if no type', () => {
  expect(
    needRefresh({ density: true, options: false }, { type: 'hello' })
  ).toEqual({ density: true, options: false })
})
