import React from 'react'
import {mount} from 'enzyme'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {MenuBar} from './MenuBar'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

describe('render', ()=>{
    it('renders', ()=>{
        const m=mount(<MenuBar options={['hello']}/>)
        expect(m).toBeDefined()
    })
})
describe('functionality', ()=>{
    it('has a vertical menu button', ()=>{
        const m=mount(<MenuBar options={['hello']}/>)
        expect(m.find(MoreVertIcon).length).toEqual(1)
    })
    it('menu has the 3 models', ()=>{
        const options=['Heston', 'CGMY', 'Merton']
        const m=mount(<MenuBar options={options}/>)
        m.find(IconButton).simulate('click')
        const menuItems=m.find(MenuItem)
        expect(menuItems.length).toEqual(options.length)
        menuItems.forEach(node=>{
            expect(options.find(v=>v===node.text())).toBeDefined()
        })
    })
})