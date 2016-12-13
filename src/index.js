import React, { Component, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import throttle from 'lodash.throttle'

function getDisplayName(component) {
  return component.displayName || component.name
}

function throttleProps(component, wait, options) {
  class Throttle extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {}
      this.throttledSetState = throttle(nextState => this.setState(nextState), wait, options)
    }
    shouldComponentUpdate(nextProps, nextState) {
      return this.state !== nextState
    }
    componentWillMount() {
      this.throttledSetState({props: this.props})
    }
    componentWillReceiveProps(nextProps) {
      this.throttledSetState({props: nextProps})
    }
    componentWillUnmount() {
      this.throttledSetState.cancel()
    }
    render() {
      return createElement(component, this.state.props)
    }
  }

  Throttle.displayName = getDisplayName(component)

  return hoistStatics(Throttle, component)
}

export default throttleProps
