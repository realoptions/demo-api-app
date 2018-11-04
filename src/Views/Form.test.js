import React from 'react'
import Form, {errorHandler} from './Form'
import {mount} from 'enzyme'
import TextField from '@material-ui/core/TextField'
describe('render', ()=>{
    it('renders', ()=>{
        const fields={
            'some name':{
                lower:-1,
                upper:1
            }
        }
        const form=mount(<Form fields={fields}/>)
        expect(form).toBeDefined()
    })
})
describe('error handling', ()=>{
    it('shows error when beyond bounds', ()=>{
        expect(errorHandler({lower:-1, upper:1, name:'some name'}, -2)).toEqual({
            label:'Value out of bounds',
            error:true
        })
    })
    it('shows label when in bounds', ()=>{
        expect(errorHandler({lower:-1, upper:1, name:'some name'}, 0)).toEqual({
            label:'some name',
            error:false
        })
    })
})
describe('functionality', ()=>{
    it('renders inputs for a given set of fields', ()=>{
        const fields={
            'some name':{
                lower:-1,
                upper:1
            }
        }
        const form=mount(<Form fields={fields}/>)
        expect(form.find(TextField).length).toEqual(1)
    })
    it('shows error when input is beyond bound', ()=>{
        const fields={
            'some name':{
                lower:-1,
                upper:1,
                value:-2
            }
        }
        const form=mount(<Form fields={fields}/>)

        const field=form.find(TextField)
        expect(field.props().label).toEqual('Value out of bounds')
        expect(field.props().error).toEqual(true)
    })
})