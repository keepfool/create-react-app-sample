
let currentTodos

export function handleChangeTodos (store) {
  let state = store.getState()
  let previousTodos = currentTodos
  currentTodos = state.todos

  if (previousTodos !== currentTodos) {
    console.log(
      'Some deep nested property changed from',
      previousTodos,
      'to',
      currentTodos
    )
  }
}
