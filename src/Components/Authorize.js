import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const onChange=(state, fn)=>e=>fn(e.target.value)
const onSubmitHOC=(api, onSubmit)=>e=>{
    e.preventDefault()
    onSubmit(api)
}
const Authorize=({onSubmit})=>{
    const [apiState, setApiState] = useState('')
    return (
    <form 
            onSubmit={onSubmitHOC(apiState, onSubmit)} 
            noValidate autoComplete="off"
    >
        <TextField
            value={apiState}
            onChange={onChange(apiState, setApiState)}
        />
        <Button type='submit'>Submit</Button>
    </form>
    )
}
Authorize.propTypes={
    onSubmit:PropTypes.func.isRequired
}
export default Authorize