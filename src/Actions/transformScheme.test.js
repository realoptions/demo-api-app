import { generateStrikes, moldAttributes } from './transformScheme'
describe('generateStrikes', () => {
  it('computes strikes around asset for 2 strikes', () => {
    expect(generateStrikes(50, 2, 0.5)).toEqual([25, 75])
  })
  it('computes strikes around asset for 3 strikes', () => {
    expect(generateStrikes(50, 3, 0.5)).toEqual([25, 50, 75])
  })
})
describe('moldAttributes', () => {
  it('correctly molds attributes', () => {
    const modelParameters = { sigma: 0.5 }
    const marketParameters = { alpha: 0.3 }
    expect(moldAttributes({ modelParameters, marketParameters }, [])).toEqual({
      alpha: 0.3,
      cf_parameters: {
        sigma: 0.5
      },
      strikes: []
    })
  })
})
