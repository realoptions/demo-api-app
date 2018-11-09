import modelChoices from './models'
import { SELECT_MODEL } from '../Actions/constants'
it('returns model when action has key', () => {
  expect(
    modelChoices(undefined, { type: SELECT_MODEL, value: 'hello' })
  ).toEqual({
    selected: 'hello',
    options: [
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
  })
})
it('returns Heston by default', () => {
  expect(modelChoices(undefined, { type: 'not api' })).toEqual({
    selected: 'heston',
    options: [
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
  })
})
