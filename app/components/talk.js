import $ from 'jquery'
import React, { Component } from 'react'

import 'stylesheets/talks.scss'

export default class Talk extends Component {
  static propTypes = {
    talk: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <h4>{this.props.talk.name}</h4>
        { this.props.talk.speakers ? (<h5>{this.props.talk.speakers}</h5>) : null }
      </div>
    )
  }
}
