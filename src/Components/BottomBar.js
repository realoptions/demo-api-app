import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Input from '@material-ui/icons/Input'
import ScatterPlot from '@material-ui/icons/ScatterPlot'
import ShowChart from '@material-ui/icons/ShowChart'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inputs, density, options } from '../Routes'
const styles = {
  root: {
    bottom: '0%',
    position: 'fixed',
    width: '100%'
  }
}
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
const BottomBar = ({
  classes,
  match: {
    params: { selected }
  }
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
      icon={<ShowChart />}
    />
    <BottomNavigationAction
      component={Link}
      to={options}
      label="Options"
      icon={<ScatterPlot />}
    />
  </BottomNavigation>
)

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      selected: PropTypes.string
    }).isRequired
  }).isRequired
}
export default withStyles(styles)(BottomBar)
