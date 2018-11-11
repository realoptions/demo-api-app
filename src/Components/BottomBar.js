import React, { useState } from 'react'
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
const BottomBar = ({ classes }) => {
  const [selected, setSelected] = useState(0)
  const handleChange = (_, value) => {
    setSelected(value)
  }
  return (
    <BottomNavigation
      value={selected}
      onChange={handleChange}
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
}
BottomBar.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(BottomBar)
