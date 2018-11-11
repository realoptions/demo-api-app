import React from 'react'
import NoApiKey from '../Components/NoApiKey'
import OptionChart from 'option-charts/PutCall'
import ImpliedVolatilityChart from 'option-charts/ImpliedVolatility'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withTheme } from '@material-ui/core/styles'
const fakeArray = []
export const Option = withTheme()(({ put, call, iv, theme }) => (
  <NoApiKey>
    <OptionChart
      call={call}
      put={put}
      strikes={fakeArray}
      sensitivity="Price"
      prices={fakeArray}
      putColor={theme.palette.secondary.main}
      callColor={theme.palette.primary.main}
    />
    <ImpliedVolatilityChart
      impliedVolatility={iv}
      lineColor={theme.palette.primary.main}
    />
  </NoApiKey>
))
Option.propTypes = {
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
  iv: PropTypes.arrayOf(
    PropTypes.shape({
      at_point: PropTypes.number.isRequired,
      iv: PropTypes.number.isRequired
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
const mapStateToProps = ({
  chartData: {
    option: { call, put, iv }
  }
}) => ({
  call,
  put,
  iv
})

export default connect(mapStateToProps)(Option)
