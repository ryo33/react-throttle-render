# react-throttle-render
[![npm version](https://badge.fury.io/js/react-throttle-render.svg)](https://badge.fury.io/js/react-throttle-render)  
  
Throttle the number of times `render()` is called.  

## Description
It may enhance the performance under the following conditions.
- The component receives new props frequently.
- The component has a huge or slow `render()`.

## Installation
`npm i --save react-throttle-render`

## Usage
```javascript
import throttle from 'react-throttle-render'

const ThrottledComponent = throttle(VeryBigRenderComponent, 50)
```

## API

### `throttle(component, wait[, option]) => wrappedComponent`
- `component` The source React component
- `wait` The number of milliseconds to throttle
- `wrappedComponent` The throttled React component
- `option` The option for lodash.throttle

## License
MIT
