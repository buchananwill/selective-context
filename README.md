# React Selective Context
This package provides an efficient state management framework using React context, allowing components to manage and subscribe to global state changes selectively.

## Features
Selective Updates: Components can subscribe to specific parts of the global state.
Efficient Rendering: Reduces unnecessary re-renders by managing which updates should affect which components.

## Installation
``` 
npm install selective-context
```

## Setup
Wrap your application with SelectiveContextManagerGlobal:

``` 
import { SelectiveContextManagerGlobal } from 'selective-context';

function App() {
return (
<SelectiveContextManagerGlobal>
<YourComponent />
</SelectiveContextManagerGlobal>
);
}

```

## Using Hooks

### Example controller:
```
  const { currentState, dispatchUpdate } = useSelectiveContextGlobalController({
    contextKey: uniqueKey,
    listenerKey: uniqueKeyForThisContext,
    initialValue: couldBeProp
  }); 
```

Initializes the state that other components may read or modify.

### Parameters:

contextKey: Key for the state slice - must be unique per stored value.
listenerKey: Key to subscribe for updates - must be unique for each listener-per-context.
initialValue: Initial value of the state slice.

### Returns:

currentState: Current state value.
dispatch: Function to update the state.

### Example Dispatcher 

``` 
  const {
    currentState
    dispatchWithoutControl
  } = useSelectiveContextGlobalDispatch({
    contextKey: keyForTheValueToSubscribeTo,
    listenerKey: uniqueForThisContext,
    initialValue: fallbackValueIfControllerNotInitialised
  });
```

Dispatches actions to update the chosen slice of global state.

Returns:

currentState: Current state value.
dispatch: Function to update the state.

### Example Listener

``` 
const { currentState } = useSelectiveContextGlobalListener<T>({
    contextKey: keyForTheValueToSubscribeTo,
    listenerKey: uniqueForThisContext,
    initialValue: fallbackValueIfControllerNotInitialised
  });
```

Listen to changes in a specific slice of the global state.

Returns:

currentState: Current state value.

Contributing
Contributions to improve or expand the package are welcome.

License
Licensed under the MIT License.