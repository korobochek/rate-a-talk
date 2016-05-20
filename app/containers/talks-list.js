import $ from 'jquery'
import React, { Component } from 'react'

import Talk from 'components/talk'

export default class TalksList extends Component {
  constructor(props) {
    super(props)
    this.state = { talks: [] }
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/talks',
      contentType: 'application/json',
      dataType: 'json',
      success: responseBody => this.setState({ talks: responseBody }),
      error: xhr => window.location = '/500.html'
    })
  }

  render() {
    return (
      <div>
        <h2>Talks</h2>
        { this.state.talks.map(talk => (<Talk key={talk.id} talk={talk}></Talk>)) }
      </div>
    )
  }
}
