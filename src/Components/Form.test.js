import React from 'react'
import Form, {
  errorHandler,
  onSubmitHOC,
  setValue,
  allowedValues
} from './Form'
import { mount } from 'enzyme'
import TextField from '@material-ui/core/TextField'
describe('render', () => {
  it('renders', () => {
    const fields = {
      'some name': {
        lower: -1,
        upper: 1
      }
    }
    const form = mount(
      <Form modelFields={fields} marketFields={fields} onSubmit={() => {}} />
    )
    expect(form).toBeDefined()
  })
})
describe('error handling', () => {
  it('shows error when beyond bounds', () => {
    expect(
      errorHandler(
        { lower: -1, upper: 1, types: 'float', name: 'some name' },
        -2
      )
    ).toEqual({
      label: 'Value out of bounds',
      error: true
    })
  })
  it('shows label when in bounds', () => {
    expect(
      errorHandler(
        { lower: -1, upper: 1, types: 'float', name: 'some name' },
        0
      )
    ).toEqual({
      label: 'some name',
      error: false
    })
  })
  it('shows error when not correct type', () => {
    expect(
      errorHandler(
        { lower: -1, upper: 1, types: 'int', name: 'some name' },
        0.5
      )
    ).toEqual({
      label: 'Value needs to be of type int',
      error: true
    })
  })
  it('shows error when not correct type and out of bounds', () => {
    expect(
      errorHandler(
        { lower: -1, upper: 1, types: 'int', name: 'some name' },
        2.5
      )
    ).toEqual({
      label: 'Value out of bounds',
      error: true
    })
  })
  it('shows label when blank', () => {
    expect(
      errorHandler({ lower: -1, upper: 1, types: 'int', name: 'some name' }, '')
    ).toEqual({
      label: 'some name',
      error: false
    })
  })
})
describe('functionality', () => {
  it('renders inputs for a given set of fields', () => {
    const fields = {
      'some name': {
        lower: -1,
        upper: 1
      }
    }
    const form = mount(
      <Form modelFields={fields} marketFields={fields} onSubmit={() => {}} />
    )
    expect(form.find(TextField).length).toEqual(2)
  })
  it('shows error when input is beyond bound', () => {
    const fields = {
      'some name': {
        lower: -1,
        upper: 1,
        value: -2
      }
    }
    const form = mount(
      <Form modelFields={fields} marketFields={fields} onSubmit={() => {}} />
    )

    const field = form.find(TextField).at(0)
    expect(field.props().label).toEqual('Value out of bounds')
    expect(field.props().error).toEqual(true)
  })
  it('submits state when onSubmit is typed', () => {
    const fields = {
      'some name': {
        lower: -1,
        upper: 1,
        value: -2
      }
    }
    const form = mount(
      <Form
        modelFields={fields}
        marketFields={fields}
        onSubmit={({ modelFields }) => {
          expect(modelFields).toEqual({
            'some name': -2
          })
        }}
      />
    )

    form.find('form').simulate('submit')
  })
})
describe('onSubmitHOC', () => {
  const e = {
    preventDefault: () => {}
  }
  it('returns flattened fields', () => {
    const modelFieldState = {
      'some name': {
        lower: -1,
        upper: 1,
        value: -2
      }
    }
    const marketFieldState = modelFieldState
    const onSubmit = jest.fn()
    onSubmitHOC(modelFieldState, marketFieldState, onSubmit)(e)
    expect(onSubmit.mock.calls[0][0]).toEqual({
      modelFields: {
        'some name': -2
      },
      marketFields: {
        'some name': -2
      }
    })
  })
})
describe('setValue', () => {
  it('returns average of upper and lower if value does not exist', () => {
    const obj = {
      someName: {
        upper: 3,
        lower: 0
      }
    }
    expect(setValue(obj)).toEqual({
      someName: { lower: 0, upper: 3, value: 1.5 }
    })
  })
  it('returns value if value does exist', () => {
    const obj = {
      someName: {
        upper: 3,
        lower: 0,
        value: 2
      }
    }
    expect(setValue(obj)).toEqual({
      someName: { lower: 0, upper: 3, value: 2 }
    })
  })
})

describe('allowedValues', () => {
  it('allows blank', () => {
    expect(allowedValues('')).toEqual(true)
  })
  it('allows strings that end in .', () => {
    expect(allowedValues('.')).toEqual(true)
    expect(allowedValues('5.')).toEqual(true)
    expect(allowedValues('asdf.')).toEqual(true)
  })
  it('allows strings that begin with .', () => {
    expect(allowedValues('.')).toEqual(true)
    expect(allowedValues('.0')).toEqual(true)
  })
  it('allows strings that begin with 0.', () => {
    expect(allowedValues('0.')).toEqual(true)
    expect(allowedValues('0.0')).toEqual(true)
  })
  it('allows strings that end with 0.', () => {
    expect(allowedValues('0.0')).toEqual(true)
    expect(allowedValues('0.00')).toEqual(true)
    expect(allowedValues('.00')).toEqual(true)
  })
  it('allows strings that cannot be parsed as float', () => {
    expect(allowedValues('asdf')).toEqual(true)
  })
  it('does not allow strings that can be parsed as float', () => {
    expect(allowedValues('5.5')).toEqual(false)
    expect(allowedValues('.5')).toEqual(false)
  })
})
