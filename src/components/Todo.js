import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ toggleTodo, removeTodo, completed, text, id }) => (
  <li className="todo">
    <div 
      className="text" 
      onClick={() => toggleTodo(id)} 
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
      {text}
    </div>
    <div className="remove" onClick={() => removeTodo(id)}>×</div>
  </li>
)

Todo.propTypes = {
  toggleTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
