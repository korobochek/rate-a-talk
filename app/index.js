import $ from 'jquery'

import { render } from 'react-dom'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import TalksList from './containers/talks-list'
import TalkDetails from './components/talk-details'

render(
  (<Router history={browserHistory}>
    <Route path="/" component={TalksList} />
    <Route path="/details/:talkId" component={TalkDetails} />
   </Router>),
  $('#react-app').get(0)
)
