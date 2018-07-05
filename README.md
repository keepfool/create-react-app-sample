# 使用Redux

## 安装依赖

安装redux, react-redux, redux-devtools依赖

```shell
yarn add redux react-redux
yarn add redux-devtools --dev
```

## 目录结构

```shell
.
├── App.css
├── App.js
├── App.test.js
├── components
│   ├── Footer.js
│   ├── Link.js
│   ├── Todo.js
│   └── TodoList.js
├── containers
│   ├── AddTodo.js
│   ├── FilterLink.js
│   └── VisibleTodoList.js
├── index.css
├── index.js
├── logo.svg
├── registerServiceWorker.js
└── store
    ├── actions
    │   ├── filterActions.js
    │   ├── githubActions.js
    │   ├── index.js
    │   └── todoActions.js
    ├── index.js
    ├── listeners
    │   └── index.js
    ├── middlewares           自定义中间件目录
    │   ├── index.js          中间件入口
    │   ├── logger.js         logger中间件
    │   ├── promise.js        promise中间件，参考redux-promise
    │   └── thunk.js          thunk中间件，参考redux-thunk
    ├── reducers
    │   ├── github.js
    │   ├── index.js
    │   ├── todos.js
    │   └── visibilityFilter.js
    └── util.js
```

## Redux工作流程

![redux](http://oprrq2p36.bkt.clouddn.com/redux-flow.png)

### 核心概念

- Store：保存数据的地方，你可以把它看成一个容器，整个应用只能有一个Store。
- State：Store对象包含所有数据，如果想得到某个时点的数据，就要对Store生成快照，这种时点的数据集合，就叫做State。
- Action：State的变化，会导致View的变化。但是，用户接触不到State，只能接触到View。所以，State的变化必须是View导致的。Action就是View发出的通知，表示State应该要发生变化了。
- Action Creator：View要发送多少种消息，就会有多少种Action。如果都手写，会很麻烦，所以我们定义一个函数来生成Action，这个函数就叫Action Creator。
- Reducer：Store收到Action以后，必须给出一个新的State，这样View才会发生变化。这种State的计算过程就叫做Reducer。Reducer是一个函数，它接受Action和当前State作为参数，返回一个新的State。
- dispatch：是View发出Action的唯一方法。

### 工作流程

- 首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。
- 然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
- State一旦有变化，Store就会调用监听函数，来更新View。

参考: [https://tech.meituan.com/redux-design-code.html](https://tech.meituan.com/redux-design-code.html)