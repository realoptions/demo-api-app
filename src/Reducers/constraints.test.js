import constraints from './constraints'
import {UPDATE_CONSTRAINTS} from '../Actions/constants'
it('returns value when action has key', ()=>{
    expect(constraints(undefined, {type:UPDATE_CONSTRAINTS, value:'hello'})).toEqual('hello')
})
it('returns empty object by default', ()=>{
    expect(constraints(undefined, {type:'not api'})).toEqual({})
})