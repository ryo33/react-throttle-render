# react-throttle-props
[![npm version](https://badge.fury.io/js/react-throttle-props.svg)](https://badge.fury.io/js/react-throttle-props)  
  
Throttle the number of times a component receives new props not to call `render()` too many times.  

## Description
It may enhance the performance under the following conditions.
- The component receives new props frequently.
- The component has a huge or slow `render()`.

## Installation
`npm i --save react-throttle-props`

## Usage
```javascript
import throttle from 'react-throttle-props'

const ThrottledComponent = throttle(VeryBigRenderComponent, 50)
```

## API

### `throttle(component, wait) => wrappedComponent`
- `component` The source React component  
- `wait` The number of milliseconds to throttle  
- `wrappedComponent` The throttled React component

## License
MIT
