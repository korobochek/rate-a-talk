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
        <div className="flexible-box">
          <h1 className="hero flexible-title">Agile Australia 2016</h1>
        </div>
        <div className="flexible-box">
          <h2 className="flexible-title">Talks</h2>
        </div>
        <div className="flexible-box">
        { this.state.talks.map(talk => (<div className="flexible-component" key={talk.id}><Talk talk={talk}></Talk></div>)) }
        </div>
      </div>
    )
  }
}
