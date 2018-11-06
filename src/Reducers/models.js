import {combineReducers} from 'redux'
import {SELECT_MODEL} from '../Actions/constants'
const initState=['Heston', 'CGMY', 'Merton']
const initSelect='Heston'


const options=(state=initState, action)=>{
    return state
}
const selected=(state=initSelect, action)=>{
    switch(action.type){
        case SELECT_MODEL:
            return action.value
        default:
            return state
    }
}
export default combineReducers({
    options, selected
})