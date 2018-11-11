import React from 'react'
import NoApiKey from '../Components/NoApiKey'
import OptionChart from 'option-charts/PutCall'
import ImpliedVolatilityChart from 'option-charts/ImpliedVolatility'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withTheme } from '@material-ui/core/styles'
const fakeArray = []
export const Density = withTheme()(({ put, call, theme }) => (
  <NoApiKey>
    <OptionChart
      call={call}
      put={put}
      strikes={fakeArray}
      prices={fakeArray}
      putColor={theme.palette.secondary.main}
      callColor={theme.palette.primary.main}
    />
    <ImpliedVolatilityChart impliedVolatility={iv} />
  </NoApiKey>
))
Density.propTypes = {
  put: PropTypes.arrayOf(
    PropTypes.shape({
      at_point: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  call: PropTypes.arrayOf(
    PropTypes.shape({
      at_point: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
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
