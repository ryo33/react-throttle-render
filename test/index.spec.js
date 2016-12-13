import React, { Component } from 'react'
import TestUtils from 'react-addons-test-utils'
import sinon from 'sinon'
import { expect } from 'chai'

import throttle from '../src/index'

let clock

before(function () { clock = sinon.useFakeTimers() })
after(function () { clock.restore() })

describe('throttle', function() {
  const Throttled = throttle(10)(class extends Component {
    render() {
      const { value } = this.props
      return React.createElement('span', null, value)
    }
  })

  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = { value: '1' }
    }

    unmount() {
      this.refs.throttled.componentWillUnmount()
    }

    mount() {
      this.refs.throttled.componentWillMount()
    }

    render() {
      const { value } = this.state
      return React.createElement(Throttled, { value, ref: "throttled" })
    }
  }

  function getValue(component) {
    return TestUtils.findRenderedDOMComponentWithTag(component, 'span').innerHTML
  }

  it('should pass props correctly', function() {
    const component = TestUtils.renderIntoDocument(
      React.createElement(Throttled, { value: 'passed' })
    )
    expect(getValue(component)).to.equal('passed')
  })

  it('should throttle props', function() {
    const component = TestUtils.renderIntoDocument(
      React.createElement(Wrapper)
    )
    expect(getValue(component)).to.equal('1')

    component.setState({value: '2'})
    expect(getValue(component)).to.equal('1')
    clock.tick(9)
    expect(getValue(component)).to.equal('1')
    clock.tick(1)
    expect(getValue(component)).to.equal('2')

    component.setState({value: '3'})
    expect(getValue(component)).to.equal('3')

    component.setState({value: '4'})
    clock.tick(9)
    expect(getValue(component)).to.equal('3')
    clock.tick(1)
    expect(getValue(component)).to.equal('4')
  })

  it('should use latest props', function() {
    const component = TestUtils.renderIntoDocument(
      React.createElement(Wrapper)
    )

    component.setState({value: '2'})
    clock.tick(2)
    expect(getValue(component)).to.equal('1')
    component.setState({value: '3'})
    clock.tick(2)
    expect(getValue(component)).to.equal('1')
    component.setState({value: '4'})
    clock.tick(2)
    expect(getValue(component)).to.equal('1')
    component.setState({value: '5'})
    clock.tick(2)
    expect(getValue(component)).to.equal('1')
    component.setState({value: '6'})
    clock.tick(2)
    expect(getValue(component)).to.equal('6')
  })

  it('should not update the props while unmounting', function() {
    const component = TestUtils.renderIntoDocument(
      React.createElement(Wrapper)
    )

    component.setState({value: '2'})
    component.unmount()
    clock.tick(10)
    expect(getValue(component)).to.equal('1')
    component.mount()
    expect(getValue(component)).to.equal('2')
    component.setState({value: '3'})
    component.unmount()
    component.mount()
    expect(getValue(component)).to.equal('3')

    component.setState({value: '4'})
    clock.tick(9)
    expect(getValue(component)).to.equal('3')
    clock.tick(1)
    expect(getValue(component)).to.equal('4')
  })
})
