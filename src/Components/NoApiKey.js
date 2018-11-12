import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  page: {
    marginTop: theme.mixins.toolbar.minHeight,
    marginBottom: theme.mixins.toolbar.minHeight
  },
  api: {
    paddingTop: 60
  }
})
export const NoApiKey = withStyles(styles)(({ mdlfn, children, classes }) => (
  <div className={classes.page}>
    {mdlfn ? children : <h3 className={classes.api}>Requires an API key!</h3>}
  </div>
))
NoApiKey.propTypes = {
  mdlfn: PropTypes.object,
  children: PropTypes.node.isRequired
}

const mapStateToProps = ({ mdlfn }) => ({ mdlfn })

export default connect(mapStateToProps)(NoApiKey)
