import React from 'react'
import {mount} from 'enzyme'
import {NoApiKey} from './NoApiKey'

describe('render', ()=>{
    it('renders', ()=>{
        const nak=mount(<NoApiKey><span>hello</span></NoApiKey>)
        expect(nak).toBeDefined()
    })
})

describe('functionality', ()=>{
    it('shows error message if no api key', ()=>{
        const nak=mount(<NoApiKey><span>hello</span></NoApiKey>)
        expect(nak.find('h3').text()).toEqual('Requires an API key!')
    })
    it('shows children if api key', ()=>{
        const nak=mount(<NoApiKey mdlfn={{hello:'world'}}><span>hello</span></NoApiKey>)
        expect(nak.find('span').text()).toEqual('hello')
    })
})