import React from 'react'
import Authorize from './Authorize'
import {mount} from 'enzyme'
import TextField from '@material-ui/core/TextField'

describe('render', ()=>{
    it('renders', ()=>{
        const auth=mount(<Authorize />)
        expect(auth).toBeDefined()
    })
})
describe('functionality', ()=>{
    it('renders inputs for a given set of fields', ()=>{
        const form=mount(<Authorize onSubmit={()=>{}}/>)
        expect(form.find(TextField).length).toEqual(1)
    })
    it('submits state when onSubmit is typed', ()=>{
        const form=mount(<Authorize onSubmit={api=>{
            expect(api).toEqual('hello')  
        }}/>)
        form.find('input').simulate('change', {target: {value: 'hello'}})
        form.find('form').simulate('submit')
    })
})