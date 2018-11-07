import React, { useState } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Input from '@material-ui/icons/Input'
import ScatterPlot from '@material-ui/icons/ScatterPlot'
import ShowChart from '@material-ui/icons/ShowChart'

export const BottomBar=()=>{
    const [selected, setSelected]=useState(0)
    const handleChange=(e, value)=>{
        setSelected(value)
    }
    return(
        <BottomNavigation
            value={selected}
            onChange={handleChange}
            showLabels
        >
            <BottomNavigationAction label="Entry" icon={<Input />} />
            <BottomNavigationAction label="Density" icon={<ShowChart />} />
            <BottomNavigationAction label="Options" icon={<ScatterPlot />} />
        </BottomNavigation>
    )
}
export default BottomBar