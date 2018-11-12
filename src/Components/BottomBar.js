import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Badge from '@material-ui/core/Badge'
import Input from '@material-ui/icons/Input'
import ScatterPlot from '@material-ui/icons/ScatterPlot'
import ShowChart from '@material-ui/icons/ShowChart'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inputs, density, options } from '../Routes'
import { connect } from 'react-redux'
import { RESET_REFRESH } from '../Actions/constants'
const styles = {
  root: {
    bottom: '0%',
    position: 'fixed',
    width: '100%'
  }
}
const badgeColor = refresh => (refresh ? 'secondary' : 'default')
const badgeContent = refresh => refresh && 1
export const chooseSelected = selected => {
  switch ('/' + selected) {
    case inputs:
      return 0
    case density:
      return 1
    case options:
      return 2
    default:
      return 0
  }
}
const BottomBar = withStyles(styles)(
  ({
    classes,
    match: {
      params: { selected }
    },
    densityRefresh,
    optionRefresh,
    resetDensityRefresh,
    resetOptionsRefresh
  }) => (
    <BottomNavigation
      value={chooseSelected(selected)}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to={inputs}
        label="Entry"
        icon={<Input />}
      />
      <BottomNavigationAction
        component={Link}
        to={density}
        label="Density"
        onClick={resetDensityRefresh}
        icon={
          <Badge
            color={badgeColor(densityRefresh)}
            badgeContent={badgeContent(densityRefresh)}
          >
            <ShowChart />
          </Badge>
        }
      />
      <BottomNavigationAction
        component={Link}
        to={options}
        label="Options"
        onClick={resetOptionsRefresh}
        icon={
          <Badge
            color={badgeColor(optionRefresh)}
            badgeContent={badgeContent(optionRefresh)}
          >
            <ScatterPlot />
          </Badge>
        }
      />
    </BottomNavigation>
  )
)
BottomBar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      selected: PropTypes.string
    }).isRequired
  }).isRequired,
  densityRefresh: PropTypes.bool.isRequired,
  optionRefresh: PropTypes.bool.isRequired,
  resetDensityRefresh: PropTypes.func.isRequired,
  resetOptionsRefresh: PropTypes.func.isRequired
}
const resetRefresh = (dispatch, type) => () =>
  dispatch({
    type: RESET_REFRESH,
    value: type
  })

const mapStateToProps = ({ needRefresh: { density, options } }) => ({
  densityRefresh: density,
  optionRefresh: options
})
const mapDispatchToProps = dispatch => ({
  resetDensityRefresh: resetRefresh(dispatch, 'density'),
  resetOptionsRefresh: resetRefresh(dispatch, 'options')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar)
