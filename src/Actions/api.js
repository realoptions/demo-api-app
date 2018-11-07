import {SELECT_MODEL, UPDATE_CONSTRAINTS} from './constants'
export const updateFields=(dispatch, value, realoptions)=>{
    dispatch({
        type:SELECT_MODEL,
        value
    })
    if(realoptions){
        realoptions[value].constraints().then(constraints=>{
            dispatch({
                type:UPDATE_CONSTRAINTS,
                constraints
            })
        })
    }
}