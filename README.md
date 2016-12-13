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

const ThrottledComponent = throttle(50)(VeryBigRenderComponent)
```

## API

### `throttle(wait[, option]) => component => wrappedComponent`
- `wait` The number of milliseconds to throttle
- `option` The option for lodash.throttle
- `component` The source React component
- `wrappedComponent` The throttled React component

## License
MIT
