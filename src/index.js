import React, { Component, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'

function getDisplayName(component) {
  return component.displayName || component.name
}

function throttle(component, wait) {
  class Throttle extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = { props }
      this.countDown = 0
      this.lastTime = Date.now()
      this.nextProps = null
      this.timeout = null
      this.useNextProps = this.useNextProps.bind(this)
    }

    useNextProps() {
      this.setState({ props: this.nextProps })
      this.countDown = wait
      this.lastTime = Date.now()
    }

    clearTimer() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    }

    componentWillMount() {
      if (this.nextProps !== null) {
        this.useNextProps()
      }
    }

    componentWillUnmount() {
      this.clearTimer()
    }

    componentWillReceiveProps(props) {
      this.clearTimer()
      this.nextProps = props
      const now = Date.now()
      this.countDown -= now - this.lastTime
      this.lastTime = now
      if (this.countDown <= 0) {
        this.useNextProps()
      } else {
        this.timeout = setTimeout(this.useNextProps, this.countDown)
      }
    }

    render() {
      const { props } = this.state
      return createElement(component, props)
    }
  }

  Throttle.displayName = getDisplayName(component)

  return hoistStatics(Throttle, component)
}

export default throttle
