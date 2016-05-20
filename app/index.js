import $ from 'jquery'

import { render } from 'react-dom'
import React from 'react'

import TalksList from './containers/talks-list'

render(
  <TalksList></TalksList>,
  $('#react-app').get(0)
)
