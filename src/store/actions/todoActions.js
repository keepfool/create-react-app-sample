let nextTodoId = 0

export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const asyncAddTodo = text => {
  return (dispatch) => {
    window.setTimeout(() => {
      dispatch(addTodo(text))
    }, 500)
  }
}

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const removeTodo = id => ({
  type: 'REMOVE_TODO',
  id
})

export const asyncRemoveTodo = id => {
  return (dispatch) => {
    window.setTimeout(() => {
      dispatch(removeTodo(id))
    }, 500)
  }
}