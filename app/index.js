import $ from 'jquery'

import { render } from 'react-dom'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from 'redux-stuff/root-reducer'
import TalksList from './containers/talks-list'
import TalkDetails from './components/talk-details'

const store = createStore(rootReducer)

render(
  (<Provider store={store}>
      <Router history={browserHistory}>
      <Route path="/" component={TalksList} />
      <Route path="/details/:talkId" component={TalkDetails} />
     </Router>
   </Provider>),
  $('#react-app').get(0)
)
