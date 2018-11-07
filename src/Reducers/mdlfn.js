import {UPDATE_API} from '../Actions/constants'
import realoptions from 'realoptions-node-sdk'
const url=process.env.NODE_ENV==='production'?undefined:'http://localhost:8000'
export default (state=null, action)=>{
    switch(action.type){
        case UPDATE_API:
            return realoptions({api_key:action.value, version:'v1', url})
        default:
            return state
    }
}