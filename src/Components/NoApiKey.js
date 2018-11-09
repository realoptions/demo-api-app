import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
export const NoApiKey=({mdlfn, children})=>mdlfn?children:(
    <h3>Requires an API key!</h3>
)
NoApiKey.propTypes={
    mdlfn:PropTypes.object,
    children:PropTypes.node.isRequired
}

const mapStateToProps=({mdlfn})=>({mdlfn})

export default connect(
    mapStateToProps
)(NoApiKey)

