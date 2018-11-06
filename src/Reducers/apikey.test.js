import apikey from './apikey'
import {API_KEY} from '../Actions/constants'
it('returns key when action has key', ()=>{
    expect(apikey(undefined, {type:API_KEY, value:'hello'})).toEqual('hello')
})
it('returns blank by default', ()=>{
    expect(apikey(undefined, {type:'not api'})).toEqual('')
})