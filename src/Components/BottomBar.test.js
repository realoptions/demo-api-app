import React from 'react'
import {mount} from 'enzyme'
import BottomBar from './BottomBar'

describe('render', ()=>{
    it('renders', ()=>{
        const nak=mount(<BottomBar/>)
        expect(nak).toBeDefined()
    })
})
