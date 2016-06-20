import $ from 'jquery'
import React, { Component } from 'react'
import { Link } from 'react-router'
import CustomRating from 'components/custom-rating'

import 'stylesheets/talks.scss'

export default class Talk extends Component {
  static propTypes = {
    talk: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="flexible-column">
        <h3 className="talk-title">{this.props.talk.name}</h3>
        { this.props.talk.speakers ? (<h5>{this.props.talk.speakers}</h5>) : null }
        <div>
          <CustomRating readonly={true} initialRate={this.props.talk.averageRating} talkId={this.props.talk.id} />
        </div>
        <Link className="button" to={`/details/${this.props.talk.id}`}>View and leave feedback</Link>
      </div>
    )
  }
}
