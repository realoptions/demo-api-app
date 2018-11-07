import {UPDATE_CONSTRAINTS} from '../Actions/constants'
export default (state={}, action)=>{
    switch(action.type){
        case UPDATE_CONSTRAINTS:
            return action.value
        default:
            return state
    }
}