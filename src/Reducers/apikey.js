import {API_KEY} from '../Actions/constants'
const initState=''


export default (state=initState, action)=>{
    switch(action.type){
        case API_KEY:
            return action.value
        default:
            return state
    }
}