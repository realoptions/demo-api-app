import mdlfn from './mdlfn'
import {UPDATE_API} from '../Actions/constants'
it('returns key when action has key', ()=>{
    expect(apikey(undefined, {type:UPDATE_API, value:'hello'})).toBeDefined()
})
it('returns blank by default', ()=>{
    expect(apikey(undefined, {type:'not api'})).toEqual('')
})