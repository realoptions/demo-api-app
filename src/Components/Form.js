import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  container: {
    //display: 'flex',
    //flexWrap: 'wrap',
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})
export const errorHandler = ({ lower, upper, name }, inputValue) => {
  if (inputValue === '' || (lower < inputValue && inputValue < upper)) {
    return { label: name, error: false }
  } else {
    return { label: 'Value out of bounds', error: true }
  }
}

const onChange = (key, state, fn) => e =>
  fn({ ...state, [key]: { ...state[key], value: e.target.value } })
const onSubmitHOC = (fieldState, onSubmit) => e => {
  e.preventDefault()
  onSubmit(fieldState)
}
const Form = ({ fields, onSubmit, classes }) => {
  const [fieldState, setFieldStateValue] = useState(fields)
  return (
    <form
      onSubmit={onSubmitHOC(fieldState, onSubmit)}
      noValidate
      autoComplete="off"
      className={classes.container}
    >
      {Object.entries(fieldState).map(
        ([name, { lower, upper, value = '' }]) => (
          <TextField
            {...errorHandler({ lower, upper, name }, value)}
            value={value}
            className={classes.textField}
            key={name}
            onChange={onChange(name, fieldState, setFieldStateValue)}
          />
        )
      )}
      <Button type="submit">Submit</Button>
    </form>
  )
}
Form.propTypes = {
  fields: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Form)
