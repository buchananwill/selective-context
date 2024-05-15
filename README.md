[![codecov](https://codecov.io/github/buchananwill/selective-context/branch/main/graph/badge.svg?token=UGS600FP3U)](https://codecov.io/github/buchananwill/selective-context)
[![CI](https://github.com/buchananwill/selective-context/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/buchananwill/selective-context/actions/workflows/main.yml)
![NPM Version](https://img.shields.io/npm/v/selective-context?color=%2351B88C)


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

Four hooks are available to use this context:

1. useGlobalController
2. useGlobalDispatch
3. useGlobalListener
4. useGlobalDispatchAndListener

Each can do the following:

|            | Initialize a variable | Read access | Write access |
|------------|-----------------------|-------------|--------------|
| Controller | Y                     | Y           | Y            |
| Dispatch   | N                     | N           | Y            |
| Listener   | N                     | Y           | N            |
| D-and-L    | N                     | Y           | Y            |

## Example controller:
```
'use client'
import {Person} from "@/app/data";
import {useGlobalController} from "selective-context";

export default function PersonController({person}:{person: Person}) {
    let {currentState, dispatch} = useGlobalController<Person>({
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

There is also a generic `ControllerComponent` which simply takes a `contextKey` and `initialValue` prop, and calls the hook internally with `'controller'` as the `listenerKey`. It is useful for splitting an array of state values to initialize them independently. 

### Example Dispatch 

``` 
import {ObjectPlaceholder, useGlobalDispatch, } from "selective-context";
import {Person} from "@/app/data";

export default function PersonDispatch({contextKey, listenerKey}:{contextKey: string; listenerKey: string}) {
    const {dispatchWithoutControl} = useGlobalDispatch<Person>({contextKey, listenerKey, initialValue: ObjectPlaceholder as Person});

    const handleClick = () => dispatchWithoutControl(personInState =>
        ({...personInState, age: (personInState.age + 1) })
    )

    return <button onClick={handleClick}>
        Grow older!
    </button>

}
```

Returns:

- dispatchWithoutControl: Function to update the state, as the Controller.

This hook is useful for components which do not need to know anything about the state in order to initiate an action on it, as they will not re-render in response to the state changing.

### Example Listener

``` 
import {ObjectPlaceholder, useGlobalListener, } from "selective-context";

import {Person} from "@/app/data";

export default function PersonListener({contextKey, listenerKey}:{contextKey: string; listenerKey: string}) {
    let {currentState} = useGlobalListener<Person>({contextKey, listenerKey, initialValue: ObjectPlaceholder as Person});

    return <div>{currentState.name}</div>
}
```

Listens to changes in a specific slice of the global state.

Returns:

currentState: Current state value.

Re-renders when this state changes.

### Example DispatchAndListener

``` 
import {ObjectPlaceholder, useGlobalDispatchAndListener, } from "selective-context";
import {Person} from "@/app/data";

export default function PersonDispatch({contextKey, listenerKey}:{contextKey: string; listenerKey: string}) {
    let {currentState, dispatchWithoutControl} = useGlobalDispatchAndListener<Person>({contextKey, listenerKey, initialValue: ObjectPlaceholder as Person});

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

This hook combines the actions of the other two hooks, both listening to and updating the state via user interaction.

## Advanced: Group Listening

A group of context keys can be listened to with the useSelectiveContextListenerGroupGlobal hook. 

If you are using this hook a lot, it may be worth considering whether conventional context would be a better design pattern for your case.

### Returns:

- currentState: a key:value map of the request contextKeys.

```
import {
  ObjectPlaceholder,
  useSelectiveContextListenerGroupGlobal,
} from "selective-context";
import { Person } from "@/app/data";

export default function PersonGroupListener({
  contextKeys,
}: {
  contextKeys: string[];
}) {
  let { currentState } = useGlobalListenerGroup<Person>({
    contextKeys,
    listenerKey: "personGroup",
    initialValue: new Map(),
  });
  return (
    <ul>
      {Object.values(currentState).map((person) => (
        <li key={person.id}>{person.name}</li>
      ))}
    </ul>
  );
}
 
```


### Contributing:
Contributions to improve or expand the package are welcome.

### License
Licensed under the MIT License.