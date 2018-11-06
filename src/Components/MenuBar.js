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
import {SELECT_MODEL} from '../Actions/constants'
import { connect } from 'react-redux'

const styles = {
    grow: {
      flexGrow: 1,
    }
}
export const MenuBar=({options, onSelect, selected, classes})=>{
    const [open, setOpen]=useState(null)
    const onClick=e=>setOpen(e.currentTarget)
    const onChoice=e=>{
        setOpen(null)
        onSelect(e.target.innerText)
    }
    const onClose=()=>setOpen(null)
    return (
    <AppBar position="static">
        <Toolbar>
            <Typography 
                variant="h6" color="inherit" 
                noWrap
            >
                Options: {selected}
            </Typography>
            <div className={classes.grow} />
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
                {options.map(option => (
                    <MenuItem key={option} onClick={onChoice}>
                    {option}
                    </MenuItem>
                ))}
            </Menu>
        </Toolbar>
    </AppBar>
    )
}
MenuBar.propTypes={
    options:PropTypes.arrayOf(PropTypes.string).isRequired,
    classes:PropTypes.object.isRequired,
    onSelect:PropTypes.func.isRequired,
    selected:PropTypes.string.isRequired
}
const mapStateToProps=({models})=>models
const mapDispatchToProps=dispatch=>({
    onSelect:value=>dispatch({type:SELECT_MODEL, value})
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MenuBar))