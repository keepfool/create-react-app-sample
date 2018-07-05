import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { VisibilityFilters } from '@/store/actions'
import * as TodoActionCreators from '@/store/actions/todoActions'
import TodoList from '@/components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
    default:
      throw new Error('Unkown filter: ' + filter)
  }
}

class TodoListContainer extends Component {
  constructor (props) {
    super(props)

    const { dispatch } = props

    /**
     * 将action creators对象转换成一个拥有同名key的对象
     * 对象的每个属性都是一个被dispatch包装过的函数，这样在组件中就能够直接调用这些函数
     */
    this.boundActionCreators = bindActionCreators(TodoActionCreators, dispatch)
  }

  componentDidMount () {
    // let { dispatch } = this.props

    // let action = TodoActionCreators.addTodo('Use Redux')
    // dispatch(action)
  }

  render () {
    let { todos } = this.props
    return <TodoList todos={todos} {...this.boundActionCreators} />
  }
}

export default connect(
  state => ({ todos: getVisibleTodos(state.todos, state.visibilityFilter)})
)(TodoListContainer)