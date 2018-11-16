import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const onChange = (state, fn) => e => fn(e.target.value)
const onSubmitHOC = (api, onSubmit) => e => {
  e.preventDefault()
  onSubmit(api)
}
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '100%'
  }
})
const Authorize = ({ onSubmit, defaultValue, classes }) => {
  const [apiState, setApiState] = useState(defaultValue || '')
  return (
    <form
      onSubmit={onSubmitHOC(apiState, onSubmit)}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={apiState}
        onChange={onChange(apiState, setApiState)}
        autoFocus
        className={classes.textField}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className={classes.textField}
      >
        Submit
      </Button>
    </form>
  )
}
Authorize.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Authorize)
