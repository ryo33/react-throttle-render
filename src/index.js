import React, { Component, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'

function getDisplayName(component) {
  return component.displayName || component.name
}

function throttle(component, wait) {
  class Throttle extends Component {
    constructor(props, context) {
      super(props, context)
      this.countDown = wait
      this.lastTime = Date.now()
      this.timeout = null
      this.update = this.update.bind(this)
    }

    clearTimer() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    }

    beforeUpdate() {
      this.countDown = wait
      this.lastTime = Date.now()
    }

    update() {
      this.beforeUpdate()
      this.timeout = null
      this.forceUpdate()
    }

    componentWillMount() {
      this.update()
    }

    componentWillUnmount() {
      this.clearTimer()
    }

    shouldComponentUpdate() {
      this.clearTimer()

      const now = Date.now()
      this.countDown -= now - this.lastTime
      this.lastTime = now

      if (this.countDown <= 0) {
        this.beforeUpdate()
        return true
      } else {
        this.timeout = setTimeout(this.update, this.countDown)
        return false
      }
    }

    render() {
      return createElement(component, this.props)
    }
  }

  Throttle.displayName = getDisplayName(component)

  return hoistStatics(Throttle, component)
}

export default throttle
