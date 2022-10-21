import {Route, Switch} from 'react-router-dom'

import Home from './assignment/Home'
import Resource from './assignment/Resource'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/resource/:id" component={Resource} />
  </Switch>
)

export default App
