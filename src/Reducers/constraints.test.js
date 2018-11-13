import constraints from './constraints'
import {
  UPDATE_CONSTRAINTS,
  UPDATE_MARKET_CONSTRAINTS
} from '../Actions/constants'
it('returns value when action has UPDATE_CONSTRAINTS', () => {
  expect(
    constraints(undefined, { type: UPDATE_CONSTRAINTS, value: 'hello' })
  ).toEqual({ modelConstraints: 'hello', marketConstraints: null })
})
it('returns value when action has UPDATE_MARKET_CONSTRAINTS', () => {
  expect(
    constraints(undefined, { type: UPDATE_MARKET_CONSTRAINTS, value: 'hello' })
  ).toEqual({ modelConstraints: null, marketConstraints: 'hello' })
})
it('returns null by default', () => {
  expect(constraints(undefined, { type: 'not api' })).toEqual({
    modelConstraints: null,
    marketConstraints: null
  })
})
it('returns state when exists but not a type', () => {
  expect(
    constraints(
      { modelConstraints: 'hello', marketConstraints: 'goodbye' },
      { type: 'not api' }
    )
  ).toEqual({ modelConstraints: 'hello', marketConstraints: 'goodbye' })
})
