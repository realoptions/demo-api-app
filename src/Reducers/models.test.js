import modelChoices from './models'
import {SELECT_MODEL} from '../Actions/constants'
it('returns model when action has key', ()=>{
    expect(modelChoices(undefined, {type:SELECT_MODEL, value:'hello'})).toEqual({
        selected:'hello', 
        options:['Heston', 'CGMY', 'Merton']
    })
})
it('returns Heston by default', ()=>{
    expect(modelChoices(undefined, {type:'not api'})).toEqual({
        selected:'Heston', 
        options:['Heston', 'CGMY', 'Merton']
    })
})