# Feather State React
![gzip](https://img.shields.io/badge/gzip-212_bytes-green)
![license](https://img.shields.io/badge/license-ISC-blue)
![version](https://img.shields.io/badge/npm-v1.0.4-blue)

✨ A feather light state framework for React ✨ 212 bytes minified and gzipped - extends feather-state

Live examples:
- [Feather To-Do app (React)](https://codesandbox.io/p/devbox/feather-to-do-app-react-jqdg3z)

Companion frameworks:
- State - [feather-state](https://www.npmjs.com/package/feather-state)
- Render - [feather-render](https://www.npmjs.com/package/feather-render)

[![coffee](https://img.shields.io/badge/Buy_me_a_coffee%3F_❤️-724e2c)](https://www.paypal.com/paypalme/featherframework)

## Getting started
```
npm i feather-state-react
```

## Usage
```typescript
import { useStore } from 'feather-state-react';

const Component = () => {
  const { sync, watch } = useStore(todoStore);

  watch(todoStore, 'todos', (next, prev) => {
    console.log(next, prev);
  });

  return (
    <p>{sync(todoStore.todos[0], 'title')}</p>
  );
};
```

## Documentation
### `store()`
```typescript
store(state) => { state, watch() } | { ...state, watch() };
```
#### Parameters
- `state`: state value

#### Return values
- `state` | `...state` - state value
- `watch()` - watch for shallow mutations

---

### `useStore()`
```typescript
useStore(store) => { sync(), watch() };
```
#### Parameters
- `store` - return value from `store()`

#### Return values
- `sync()` - re-render DOM when value changes
- `watch()` - watch for shallow mutations

---

### `useStore().sync()`
```typescript
sync(parent, key) => value;
```
#### Parameters
- `parent` - parent object of watched value
- `key` - key of watched value

#### Return values
- `value` - value of `parent[key]`

---

### `useStore().watch()`
```typescript
watch(parent, key, callback) => unwatch();
```
#### Parameters
- `parent` - parent object of watched value
- `key` - key of watched value
- `callback()` - function called when value changes

#### Return values
- `unwatch()` - function to unwatch value (Note: values are also automatically unwatched when component unmounts)

## Example
### todos.ts
```typescript
import { store } from 'feather-state-react';

export const todoStore = store({
  completedCount: 1,
  todos: [{
    id: 123,
    title: 'Todo 1',
    done: true
  }, {
    id: 456,
    title: 'Todo 2',
    done: false
  }]
});

const updateCompletedCount = () => {
  todoStore.completedCount = todoStore.todos.filter(todo => todo.done).length;
};
```

### TodoList.ts
```typescript
import { useStore } from 'feather-state-react';
import { todoStore, updateCompletedCount } from './todos';
import { TodoItem } from './TodoItem';

const TodoList = () => {
  const { sync, watch } = useStore(todoStore);

  watch(todoStore, 'todos', () => {
    updateCompletedCount();
  });

  return (
    <>
      <ul>
        {sync(todoStore, 'todos').map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <p>Completed: {sync(todoStore, 'completedCount')}</p>
    </>
  );
};
```

### TodoItem.ts
```typescript
import { useStore } from 'feather-state-react';
import { todoStore, updateCompletedCount } from './todos';

const TodoItem = ({ todo }) => {
  const { watch } = useStore(todoStore);

  watch(todo, 'done', () => {
    updateCompletedCount();
  });

  return (
    <li>{todo.title}</li>
  );
};
```

## Roadmap 🚀
- Minified version via CDN
- Cleaner way of referencing values in render
