import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
    overflow: 'scroll'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
const onSubmitHOC = (modelFieldState, marketFieldState, onSubmit) => e => {
  e.preventDefault()
  onSubmit({ modelFields: modelFieldState, marketFields: marketFieldState })
}
const Form = ({ modelFields, marketFields, onSubmit, classes }) => {
  const [modelFieldState, setModelFieldStateValue] = useState(modelFields)
  const [marketFieldState, setMarketFieldStateValue] = useState(marketFields)
  return (
    <form
      onSubmit={onSubmitHOC(modelFieldState, marketFieldState, onSubmit)}
      noValidate
      autoComplete="off"
      className={classes.container}
    >
      {Object.entries(marketFieldState).map(
        ([name, { lower, upper, value = (lower + upper) * 0.5 }]) => (
          <TextField
            {...errorHandler({ lower, upper, name }, value)}
            value={value}
            className={classes.textField}
            key={name}
            onChange={onChange(
              name,
              marketFieldState,
              setMarketFieldStateValue
            )}
          />
        )
      )}
      {Object.entries(modelFieldState).map(
        ([name, { lower, upper, value = (lower + upper) * 0.5 }]) => (
          <TextField
            {...errorHandler({ lower, upper, name }, value)}
            value={value}
            className={classes.textField}
            key={name}
            onChange={onChange(name, modelFieldState, setModelFieldStateValue)}
          />
        )
      )}
      <Button
        className={classes.textField}
        variant="contained"
        color="secondary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
Form.propTypes = {
  marketFields: PropTypes.object.isRequired,
  modelFields: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Form)
