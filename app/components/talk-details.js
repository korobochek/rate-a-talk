import $ from 'jquery'
import React, { Component } from 'react'

export default class TalkDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { talk: {} }
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: `/talks/${this.props.params.talkId}`,
      contentType: 'application/json',
      dataType: 'json',
      success: responseBody => this.setState({ talk: responseBody }),
      error: xhr => window.location = '/500.html'
    })
  }

  render() {
    return (
      <div className="flexible-box">
        <div className="flexible-component">
          <h1>{ this.state.talk.name }</h1>
        </div>
        <div className="flexible-component">
          <h3>{ this.state.talk.speakers }</h3>
        </div>
        <div className="flexible-component">
        </div>
      </div>
    )
  }
}
