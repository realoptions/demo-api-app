import React, {useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ApiKey from './ApiKey'
import {updateFields} from '../Actions/api'

const styles = {
    grow: {
      flexGrow: 1,
    }
}

const convertOptionsToLabel=(
    options, 
    selectedName
)=>options.find(({name})=>name===selectedName).label

const convertOptionsToName=(
    options, 
    selectedLabel
)=>options.find(({label})=>label===selectedLabel).name

export const MenuBar=withStyles(styles)(({
    options, onSelect, selected, mdlfn, classes
})=>{
    const [open, setOpen]=useState(null)
    const onClick=e=>setOpen(e.currentTarget)
    const onChoice=e=>{
        setOpen(null)
        onSelect(
            selected, 
            convertOptionsToName(options, e.target.innerText),
            mdlfn
        )
    }
    const onClose=()=>setOpen(null)
    return (
    <AppBar position="static">
        <Toolbar>
            <Typography 
                variant="h6" color="inherit" 
                noWrap
            >
                Options: {convertOptionsToLabel(options, selected)}
            </Typography>
            <div className={classes.grow} />
            <ApiKey/>
            <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={onClick}
                color="inherit"
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={open}
                open={open===null?false:true}
                onClose={onClose}
            >
                {options.map(({label, name}) => (
                    <MenuItem key={name} onClick={onChoice}>
                    {label}
                    </MenuItem>
                ))}
            </Menu>
        </Toolbar>
    </AppBar>
    )
})
MenuBar.propTypes={
    options:PropTypes.arrayOf(PropTypes.shape({
        name:PropTypes.string.isRequired,
        label:PropTypes.string.isRequired
    })).isRequired,
    onSelect:PropTypes.func.isRequired,
    selected:PropTypes.string.isRequired
}
const mapStateToProps=({models, mdlfn})=>({...models, mdlfn})
const mapDispatchToProps=dispatch=>({
    onSelect:(
        selected, value, realoptions
    )=>selected!==value&&updateFields(dispatch, value)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar)