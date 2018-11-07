import React, { useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Input from '@material-ui/icons/Input'
import ScatterPlot from '@material-ui/icons/ScatterPlot'
import ShowChart from '@material-ui/icons/ShowChart'
import { withStyles } from '@material-ui/core/styles'

const styles={
    root:{
        bottom:'0%',
        position:'fixed',
        width:'100%'
    }
}
export const BottomBar=withStyles(styles)(({classes})=>{
    const [selected, setSelected]=useState(0)
    const handleChange=(e, value)=>{
        setSelected(value)
    }
    return (
        <BottomNavigation
            value={selected}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Entry" icon={<Input />} />
            <BottomNavigationAction label="Density" icon={<ShowChart />} />
            <BottomNavigationAction label="Options" icon={<ScatterPlot />} />
        </BottomNavigation>
    )
})
export default BottomBar