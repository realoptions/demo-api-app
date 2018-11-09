import React from 'react'
import Async from 'react-async'
import NoApiKey from '../Components/NoApiKey'
import { updateFields, updateAllGraphs } from '../Actions/api'
import { connect } from 'react-redux'
import Form from '../Components/Form'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
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
        {() => (
          <Form
            fields={constraints}
            onSubmit={updateAllGraphs(mdlfn, selected)}
          />
        )}
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
  updateAllGraphs: (mdlfn, selected) => parameters =>
    updateAllGraphs({
      dispatch,
      selectedModel: selected,
      parameters,
      realOptions: mdlfn,
      optionType: 'call',
      sensitivityType: 'price'
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputs)
