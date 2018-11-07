import {
    SELECT_MODEL, 
    UPDATE_CONSTRAINTS, UPDATE_RISK_METRIC,
    UPDATE_DENSITY, UPDATE_OPTIONS
} from './constants'
export const updateFields=(dispatch, selectedModel, realoptions)=>{
    dispatch({
        type:SELECT_MODEL,
        value:selectedModel
    })
    if(realoptions){
        realoptions[selectedModel].constraints().then(constraints=>{
            dispatch({
                type:UPDATE_CONSTRAINTS,
                constraints
            })
        })
    }
}
export const updateDensity=(dispatch, selectedModel, parameters, realoptions)=>{
    if(realoptions){
        realoptions[selectedModel].density(parameters).then(value=>{
            dispatch({
                type:UPDATE_DENSITY,
                value
            })
        })
    }
}
export const updateRiskMetrics=(dispatch, selectedModel, parameters, realoptions)=>{
    if(realoptions){
        realoptions[selectedModel].riskmetric(parameters).then(value=>{
            dispatch({
                type:UPDATE_RISK_METRIC,
                value
            })
        })
    }
}
export const density=(
    dispatch, selectedModel, parameters, 
    optionType, sensitivityType, realoptions
)=>{
    if(realoptions){
        realoptions[selectedModel].options(
            parameters, optionType, 
            sensitivityType
        ).then(value=>{
            dispatch({
                type:UPDATE_OPTIONS,
                value
            })
        })
    }
    
}