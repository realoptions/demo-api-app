import mdlfn from './mdlfn'
import {UPDATE_API} from '../Actions/constants'
it('returns key when action has key', ()=>{
    expect(mdlfn(undefined, {type:UPDATE_API, value:'hello'})).toBeDefined()
})
it('returns null by default', ()=>{
    expect(mdlfn(undefined, {type:'not api'})).toEqual(null)
})