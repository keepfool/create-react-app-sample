# create-react-app-sample

## 1. 新建项目

不需要全局安装`create-react-app`脚手架工具，使用npx就能创建一个react应用，要求npm@5.2+

```shell
npx create-react-app my-app

cd my-app

npm start
```

## 2. 添加hot-reloader

`create-react-app`创建的项目默认是没有热加载的，每次更改js都会强制刷新页面，我们引入`react-hot-loader`模块来实现热加载。

### 安装`react-hot-loader`

```shell
yarn add react-hot-loader --dev
```

or

```shell
npm i react-hot-loader --save-dev
```

### 安装`react-app-rewired`

```shell
yarn add react-app-rewired --dev
```

or

```shell
npm i react-app-rewired --save-dev
```

### 配置`config-overrides.js`文件

在项目根目录下添加config-overrides.js文件

```jsx
const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override (config, env) {
  //do stuff with the webpack config...
  // 生产环境不需要hot-reloader
  if (env === 'production') {
    return config
  }

  // 向babel-loader添加react-hot-loader插件
  config = injectBabelPlugin('react-hot-loader/babel', config)
  return config
}
```

#### `react-app-rewired`也可以配置webpack的alias

```js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override (config, env) {
  // 路径别名映射，用'@'来表示'src'绝对路径
  config.resolve.alias = {
    '@': resolve('src')
  }
  return config
}
```

### 更改App.js

- 引入`react-hot-loader`的`hot`函数
- 导出被热加载处理过的App组件

```jsx
import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { hot } from 'react-hot-loader'

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default hot(module)(App)
```

### 更改scripts

将`react-scripts`替换成`react-app-rewired`

```diff
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom"
}
```

## 3. 配置eslint

### 基础配置

在项目根目录下新建一个`.eslintrc.js`文件，添加以下基础配置

```jsx
module.exports = {
  "extends": ["react-app"]
};
```

如果不想使用eslint文件，也可以在`package.json`文件配置`eslintConfig`节点。

```jsxon
{
  "eslintConfig": {
  }
}
```

### 使用eslint-config-react-app推荐配置

按照[eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app)的指引，添加`a11y`配置

```jsx
module.exports = {
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
};
```

`create-react-app`在创建项目时，已经帮我们安装了[eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app), [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)，所以不用担心这些模块的缺失。

```shell
keepfool:create-react-app-sample/ $ yarn list eslint-config-react-app eslint-plugin-jsx-a11y                                                                            [18:13:09]
yarn list v1.0.1
├─ eslint-config-react-app@2.1.0
└─ eslint-plugin-jsx-a11y@5.1.1
✨  Done in 0.60s.
```

### 不加分号

添加`rules`节点，然后设置`"semi": ["error", "never"]`

```jsx
module.exports = {
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"],
  "rules": {
    "semi": ["error", "never"]
  }
};
```

### 其他规则

再配置一些其他规则，完整的eslint配置如下

```jsx
module.exports = {
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"],
  "rules": {
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1,
        "flatTernaryExpressions": true
      }
    ],
    "react/jsx-indent": [
      "warn",
      2
    ],
    "react/jsx-indent-props": [
      "warn",
      2
    ],
    "semi": ["error", "never"],
    "no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "none",
        "caughtErrors": "none"
      }
    ]
  }
};
```

到这一步，一个基础的react应用已经配置好了，运行`npm start`启动应用

## 4. 使用react-router

### 安装`react-router-dom`

```shell
yarn add react-router-dom
```

or

```shell
npm i react-router-dom
```

**注意：使用react-router需要安装的是`react-router-dom`模块，不是`react-router`模块**

### 基础示例

添加`./pages/BasicExample.js`

```jsx
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample
```

在App.js中渲染BasicExample组件

```jsx
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import logo from './logo.svg'
import './App.css'

import BasicExample from './pages/BasicExample'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BasicExample />
      </div>
    )
  }
}

export default hot(module)(App)
```

### 使用Code Splitting

BasicExample将所有的页面都编译到一个bundle了，页面越多会导致bundle的体积越大，这对用户体验是一个挑战。

我们可以将每个页面，以及页面内使用的组件包装成异步的，在用户访问页面或功能时才去加载组件对应的资源。

#### 安装`react-loadable`

```shell
yarn add react-loadable
```

or

```shell
npm i react-loadable
```

使用方式

```jsx
import Loadable from 'react-loadable';

const LoadableBar = Loadable({
  loader: () => import('./components/Bar'),
  loading() {
    return <div>Loading...</div>
  }
});

class MyComponent extends React.Component {
  render() {
    return <LoadableBar/>;
  }
}
```

**`react-loadable` is a higher-order component for loading components with dynamic imports.**

#### 提取组件

新建一个components目录，将`BasicExample`中使用的组件提取出来

- Home
- About
- Topics
- Topic
- Loading

`Topic`是`Topics`的子组件，它也是异步的。topics页面显示一个topic列表，用户点击列表链接时才渲染`Topic`组件。

```jsx
/* ./components/Topics.js */
import React from 'react'
import { Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './Loading'

const AsyncTopic = Loadable({
  loader: () => import('./Topic'),
  loading: Loading
})

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={AsyncTopic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
)

export default Topics
```

### 异步页面组件

新建`./pages/BasicExampleCodeSplitting.js`，由`react-loadable`高阶组件生成异步页面组件。

```jsx
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const BasicExampleCodeSplitting = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={AsyncHome} />
      <Route path="/about" component={AsnycAbout} />
      <Route path="/topics" component={AsyncTopics} />
    </div>
  </Router>
)

const AsyncHome = Loadable({
  loader: () => import('../components/Home'),
  loading: Loading
})

const AsnycAbout = Loadable({
  loader: () => import('../components/About'),
  loading: Loading
})

const AsyncTopics = Loadable({
  loader: () => import('../components/Topics'),
  loading: Loading
})

export default BasicExampleCodeSplitting
```

不要忘了修改`App.js`，引入`BasicExampleCodeSplitting`，然后在`App`组件中渲染

```jsx
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import logo from './logo.svg'
import './App.css'

import BasicExampleCodeSplitting from './pages/BasicExampleCodeSplitting'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BasicExampleCodeSplitting />
      </div>
    )
  }
}

export default hot(module)(App)
```

## 5. 使用Redux

**请checkout到redux-todo-sample分支**

### 安装依赖

安装redux, react-redux, redux-devtools依赖

```shell
yarn add redux react-redux
yarn add redux-devtools --dev
```

### 目录结构

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

### Redux工作流程

![redux](http://oprrq2p36.bkt.clouddn.com/redux-flow.png)

#### 核心概念

- Store：保存数据的地方，你可以把它看成一个容器，整个应用只能有一个Store。
- State：Store对象包含所有数据，如果想得到某个时点的数据，就要对Store生成快照，这种时点的数据集合，就叫做State。
- Action：State的变化，会导致View的变化。但是，用户接触不到State，只能接触到View。所以，State的变化必须是View导致的。Action就是View发出的通知，表示State应该要发生变化了。
- Action Creator：View要发送多少种消息，就会有多少种Action。如果都手写，会很麻烦，所以我们定义一个函数来生成Action，这个函数就叫Action Creator。
- Reducer：Store收到Action以后，必须给出一个新的State，这样View才会发生变化。这种State的计算过程就叫做Reducer。Reducer是一个函数，它接受Action和当前State作为参数，返回一个新的State。
- dispatch：是View发出Action的唯一方法。

#### 工作流程

- 首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。
- 然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
- State一旦有变化，Store就会调用监听函数，来更新View。

参考: [https://tech.meituan.com/redux-design-code.html](https://tech.meituan.com/redux-design-code.html)