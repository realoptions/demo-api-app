import React from 'react'
import connect from 'redux'
export const NoApiKey=({mdlfn, children})=>mdlfn?children:(
    <h3>Requires an API key!</h3>
)

const mapStateToProps=({mdlfn})=>({mdlfn})

export default connect(
    mapStateToProps
)(NoApiKey)

