import React from 'react'
import NoApiKey from '../Components/NoApiKey'
import DensityChart from 'option-charts/Density'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withTheme } from '@material-ui/core/styles'
export const Density = withTheme()(({ density, riskMetric, theme }) => (
  <NoApiKey>
    <DensityChart
      density={density}
      {...riskMetric}
      varColor={theme.palette.secondary.main}
      densityColor={theme.palette.primary.main}
    />
  </NoApiKey>
))
Density.propTypes = {
  density: PropTypes.arrayOf(
    PropTypes.shape({
      at_point: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  riskMetric: PropTypes.shape({
    value_at_risk: PropTypes.number,
    expected_shortfall: PropTypes.number
  }).isRequired,
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        main: PropTypes.string.isRequired
      }).isRequired,
      secondary: PropTypes.shape({
        main: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  })
}
const mapStateToProps = ({ chartData: { density, riskMetric } }) => ({
  density,
  riskMetric
})

export default connect(mapStateToProps)(Density)
