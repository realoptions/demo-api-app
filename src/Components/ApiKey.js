import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'
import Authorize from './Authorize'
import { connect } from 'react-redux'
import {UPDATE_API} from '../Actions/constants'
import PropTypes from 'prop-types'

export const ApiKey=({mdlfn, onSubmit})=>{
    const [open, handleOpen]=useState(false)
    const handleCancel=()=>handleOpen(!open)
    const onOpen=()=>handleOpen(true)
    const onDialogSubmit=api=>{
        handleOpen(false)
        onSubmit(api)
    }
    return (
        <>
            <IconButton 
                aria-label="Lock"
                aria-owns='long-menu'
                onClick={onOpen}
                color="inherit"
            >
                {mdlfn?<LockOpen/>:<Lock/>}
            </IconButton>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Enter API Key</DialogTitle>
                <DialogContent>
                    <Authorize onSubmit={onDialogSubmit}/>
                </DialogContent>
            </Dialog>
        </>
    )
}
ApiKey.propTypes={
    onSubmit:PropTypes.func.isRequired,
    mdlfn:PropTypes.object
}
const mapStateToProps=({mdlfn})=>({mdlfn})
const mapDispatchToProps=dispatch=>({
    onSubmit:value=>dispatch({type:UPDATE_API, value})
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApiKey)