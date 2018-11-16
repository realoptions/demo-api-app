import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { flattenObj } from '../Actions/transformScheme'
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
export const errorHandler = ({ lower, upper, name, types }, inputValue) => {
  const isInBetween = lower < inputValue && inputValue < upper
  const isBlank = inputValue === ''
  const isCorrectType =
    (types === 'int' && Number.isInteger(inputValue)) ||
    (types === 'float' && Number.isFinite(inputValue))
  if (isBlank || (isInBetween && isCorrectType)) {
    return { label: name, error: false }
  } else if (!isInBetween) {
    return { label: 'Value out of bounds', error: true }
  } else if (!isCorrectType) {
    return { label: `Value needs to be of type ${types}`, error: true }
  }
}
const flattenValue = flattenObj('value')
//export for testing
export const allowedValues = value => {
  if (value === '') {
    return true
  }
  if (value.substr(-1) === '.') {
    return true
  }
  if (isNaN(parseFloat(value))) {
    return true
  }
  return false
}
const onChange = (key, state, fn) => e =>
  fn({
    ...state,
    [key]: {
      ...state[key],
      value: allowedValues(e.target.value)
        ? e.target.value
        : parseFloat(e.target.value)
    }
  })

const convertToType = (value, types) =>
  types === 'int' ? Math.round(value) : value
//export for testing
export const onSubmitHOC = (
  modelFieldState,
  marketFieldState,
  onSubmit
) => e => {
  e.preventDefault()
  onSubmit({
    modelFields: flattenValue(modelFieldState),
    marketFields: flattenValue(marketFieldState)
  })
}
const convertLowerUpperToValue = (name, lower, upper) => {
  switch (name) {
    case 'asset':
      return 50
    case 'maturity':
      return 1
    default:
      return (lower + upper) * 0.5
  }
}
//export for testing
export const setValue = obj =>
  Object.entries(obj).reduce(
    (
      aggr,
      [
        name,
        {
          lower,
          upper,
          types,
          value = convertToType(
            convertLowerUpperToValue(name, lower, upper),
            types
          )
        }
      ]
    ) => ({
      ...aggr,
      [name]: { lower, upper, value, types }
    }),
    {}
  )
const Form = ({ modelFields, marketFields, onSubmit, classes }) => {
  const [modelFieldState, setModelFieldStateValue] = useState(
    setValue(modelFields)
  )
  const [marketFieldState, setMarketFieldStateValue] = useState(
    setValue(marketFields)
  )
  return (
    <form
      onSubmit={onSubmitHOC(modelFieldState, marketFieldState, onSubmit)}
      noValidate
      autoComplete="off"
      className={classes.container}
    >
      {Object.entries(marketFieldState).map(
        ([name, { lower, upper, value, types }]) => (
          <TextField
            {...errorHandler({ lower, upper, name, types }, value)}
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
        ([name, { lower, upper, value, types }]) => (
          <TextField
            {...errorHandler({ lower, upper, name, types }, value)}
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
