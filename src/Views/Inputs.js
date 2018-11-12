import React from 'react'
import Async from 'react-async'
import NoApiKey from '../Components/NoApiKey'
import { updateFields, updateAllGraphs } from '../Actions/api'
import { connect } from 'react-redux'
import Form from '../Components/Form'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { SET_ALL_REFRESH } from '../Actions/constants'

export const Inputs = ({
  selected,
  updateFields,
  mdlfn,
  constraints,
  updateAllGraphs
}) => (
  <NoApiKey>
    <Async promiseFn={updateFields(mdlfn, constraints, selected)}>
      <Async.Resolved>
        {constraints ? (
          <Form
            fields={constraints}
            onSubmit={updateAllGraphs(mdlfn, selected)}
          />
        ) : null}
      </Async.Resolved>
      <Async.Loading>
        <CircularProgress />
      </Async.Loading>
    </Async>
  </NoApiKey>
)
Inputs.propTypes = {
  selected: PropTypes.string.isRequired,
  updateFields: PropTypes.func.isRequired,
  updateAllGraphs: PropTypes.func.isRequired,
  mdlfn: PropTypes.object,
  constraints: PropTypes.object
}
const mapStateToProps = ({ mdlfn, models: { selected }, constraints }) => ({
  mdlfn,
  selected,
  constraints
})
const mapDispatchToProps = dispatch => ({
  updateFields: (mdlfn, constraints, selected) => () =>
    updateFields({
      dispatch,
      realOptions: mdlfn,
      existingValue: constraints,
      selectedModel: selected
    }),
  updateAllGraphs: (mdlfn, selected) => parameters => {
    dispatch({ type: SET_ALL_REFRESH })
    updateAllGraphs({
      dispatch,
      selectedModel: selected,
      parameters,
      realOptions: mdlfn,
      optionType: 'call',
      sensitivityType: 'price'
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputs)
