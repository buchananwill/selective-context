# React Selective Context
This package provides an efficient state management framework using React context, allowing components to manage and subscribe to global state changes selectively.

## Features
- Selective Updates: Components can subscribe to specific parts of the global state.
- Efficient Rendering: Reduces unnecessary re-renders by managing which updates should affect which components.
- Controller-Dispatch-Listener Pattern: Three tiers of subscription hook creates a clear data hierarchy.

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

Three hooks are available:

1. useSelectiveContextGlobalController
2. useSelectiveContextGlobalDispatch
3. useSelectiveContextGlobalListener

Each can do the following:

|            | Initialize a variable | Read access | Write access |
|------------|-----------------------| ----------- |--------------|
| Controller | Y                     |           Y | Y            |
| Dispatch   | N                     |           Y | Y            |
| Listener   | N                     |           Y | N            |

## Example controller:
```
'use client'
import {Person} from "@/app/data";
import {useSelectiveContextGlobalController} from "selective-context";

export default function PersonController({person}:{person: Person}) {
    let {currentState, dispatch} = useSelectiveContextGlobalController<Person>({
        contextKey: 'controlledPerson',
        initialValue: person,
        listenerKey: 'controller'
    });

    const handleClick = () => dispatch(personInState =>
        ({...personInState, name: `${personInState.name}ob`})
    )

    return <button onClick={handleClick}>
        {currentState.name}
    </button>
}
```


### Parameters:

contextKey: Key for the state slice - must be unique per stored value.
listenerKey: Key to subscribe for updates - must be unique for each listener-per-context.
initialValue: Initial value of the state slice.

### Returns:

- currentState: Current state value.
- dispatch: Function to update the state, of type Dispatch<SetStateAction<T>>. It accepts both:
  - T 
  - a function to mutate T.

### Example Dispatcher 

``` 
import {ObjectPlaceholder, useSelectiveContextGlobalListener, } from "selective-context";
import {Person} from "@/app/data";

export default function PersonDispatch({contextKey, listenerKey}:{contextKey: string; listenerKey: string}) {
    let {currentState,dispatchWithoutControl} = useSelectiveContextGlobalDispatch<Person>({contextKey, listenerKey, initialValue: ObjectPlaceholder as Person});

    const handleClick = () => dispatchWithoutControl(personInState =>
        ({...personInState, name: `${personInState.name}ib`})
    )

    return <button onClick={handleClick}>
        {currentState.name}
    </button>

}
```

Returns:

- currentState: Current state value.
- dispatchWithoutControl: Function to update the state, as the Controller..

### Example Listener

``` 
import {ObjectPlaceholder, useSelectiveContextGlobalListener, } from "selective-context";

import {Person} from "@/app/data";

export default function PersonListener({contextKey, listenerKey}:{contextKey: string; listenerKey: string}) {
    let {currentState} = useSelectiveContextGlobalListener<Person>({contextKey, listenerKey, initialValue: ObjectPlaceholder as Person});

    return <div>{currentState.name}</div>
}
```

Listens to changes in a specific slice of the global state.

Returns:

currentState: Current state value.

### Contributing:
Contributions to improve or expand the package are welcome.

### License
Licensed under the MIT License.