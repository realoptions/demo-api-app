import React from 'react'
import Async from "react-async"
import NoApiKey from '../Components/NoApiKey'
import {updateFields, updateAllGraphs} from '../Actions/api'
import {connect} from 'redux'
import Form from '../Components/Form'
export const Inputs=({
    selected, updateFields, 
    mdlfn, constraints
})=>{
    <NoApiKey>
        <Async promiseFn={updateFields(mdlfn, constraints, selected)}>
            <Async.Resolved>
                {()=>(
                    <Form fields={constraints} onSubmit={}/>
                )}
            </Async.Resolved>
        </Async>
    </NoApiKey>
}

const mapStateToProps=({mdlfn, models:{selected}, constraints})=({mdlfn, selected, constraints})
const mapDispatchToProps=dispatch=>({
    updateFields:(mdlfn, constraints, selected)=>()=>updateFields({
        dispatch,
        realOptions:mdlfn, 
        existingValue:constraints, 
        selectedModel:selected
    }),
    updateAllGraphs:(mdlfn, selected, )=>parameters
})
