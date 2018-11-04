import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
export const errorHandler=({lower, upper, name}, inputValue)=>{
    if(
        (inputValue==='')||
        (lower<inputValue&&inputValue<upper)
    ){
        return {label:name, error:false}
    }
    else{
        return {label:'Value out of bounds', error:true}
    }
}

const onChange=(key, state, fn)=>e=>fn({...state, [key]:{...state[key], value:e.target.value}})
const onSubmitHOC=(fieldState, onSubmit)=>e=>{
    e.preventDefault()
    onSubmit(fieldState)
}
const Form=({fields, onSubmit})=>{
    const [fieldState, setFieldStateValue] = useState(fields)
    return (
    <form 
            onSubmit={onSubmitHOC(fieldState, onSubmit)} 
            noValidate autoComplete="off"
    >
        {Object.entries(fieldState).map(([name, {lower, upper, value=''}])=>(
            <TextField
                {...errorHandler({lower, upper, name}, value)}
                value={value}
                key={name}
                onChange={onChange(name, fieldState, setFieldStateValue)}
            />
        ))}
        <Button type='submit'>Submit</Button>
    </form>
    )
}
Form.propTypes={
    fields:PropTypes.object.isRequired,
    onSubmit:PropTypes.func.isRequired
}
export default Form