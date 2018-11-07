import React from 'react'
import {mount} from 'enzyme'
import {ApiKey} from './ApiKey'
describe('render', ()=>{
    it('renders', ()=>{
        const apikey=mount(<ApiKey/>)
        expect(apikey).toBeDefined()
    })
})