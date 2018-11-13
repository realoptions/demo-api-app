import React from 'react'
import Async from 'react-async'
import NoApiKey from '../Components/NoApiKey'
import { updateFields, updateAllGraphs } from '../Actions/api'
import { connect } from 'react-redux'
import Form from '../Components/Form'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { SET_ALL_REFRESH } from '../Actions/constants'
import { moldAttributes, generateStrikes } from '../Actions/transformScheme'
const NUM_STRIKES = 10
const PERCENT_RANGE = 0.5
export const Inputs = ({
  selected,
  updateFields,
  mdlfn,
  modelConstraints,
  marketConstraints,
  updateAllGraphs
}) => (
  <NoApiKey>
    <Async
      promiseFn={updateFields(
        mdlfn,
        modelConstraints,
        marketConstraints,
        selected
      )}
    >
      <Async.Resolved>
        {marketConstraints && modelConstraints ? (
          <Form
            marketFields={marketConstraints}
            modelFields={modelConstraints}
            onSubmit={updateAllGraphs(mdlfn, selected, modelConstraints)}
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
  modelConstraints: PropTypes.object,
  marketConstraints: PropTypes.object
}
const mapStateToProps = ({
  mdlfn,
  models: { selected },
  constraints: { marketConstraints, modelConstraints }
}) => ({
  mdlfn,
  selected,
  modelConstraints,
  marketConstraints
})
const mapDispatchToProps = dispatch => ({
  updateFields: (mdlfn, modelConstraints, marketConstraints, selected) => () =>
    updateFields({
      dispatch,
      realOptions: mdlfn,
      existingModelValue: modelConstraints,
      existingMarketValue: marketConstraints,
      selectedModel: selected
    }),
  updateAllGraphs: (mdlfn, selected) => ({ modelFields, marketFields }) => {
    dispatch({ type: SET_ALL_REFRESH })
    updateAllGraphs({
      dispatch,
      selectedModel: selected,
      parameters: moldAttributes(
        { modelParameters: modelFields, marketParameters: marketFields },
        generateStrikes(marketFields.asset, NUM_STRIKES, PERCENT_RANGE)
      ),
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
