export const generateStrikes = (asset, numStrikes, percentRange) => {
  let strikes = []
  const minStrike = percentRange * asset
  const maxStrike = (1 + percentRange) * asset
  const dx = (maxStrike - minStrike) / (numStrikes - 1)
  for (let i = 0; i < numStrikes; ++i) {
    strikes.push(minStrike + i * dx)
  }
  return strikes
}
export const moldAttributes = (
  { modelParameters, marketParameters },
  strikes
) => ({
  ...marketParameters,
  cf_parameters: modelParameters,
  strikes
})
//exported for testing
export const flattenObj = key => obj =>
  Object.entries(obj).reduce(
    (aggr, [objKey, curr]) => ({
      ...aggr,
      [objKey]: curr[key]
    }),
    {}
  )
