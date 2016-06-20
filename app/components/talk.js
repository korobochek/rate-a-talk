import $ from 'jquery'
import React, { Component } from 'react'
import { Link } from 'react-router'
import Rating from 'react-rating'

import 'stylesheets/talks.scss'

export default class Talk extends Component {
  static propTypes = {
    talk: React.PropTypes.object.isRequired
  }

  onStarRatingPress(value, name) {
    const ratingData = { rating: value, talkId: this.props.talk.id}
    $.ajax({
      type: 'POST',
      url: '/ratings',
      data: JSON.stringify(ratingData),
      contentType: 'application/json',
      dataType: 'json',
      success: responseBody => console.log(responseBody),
      error: xhr => { if (xhr.status != 201) window.location = '/500.html' }
    })
  }

  render() {
    return (
      <div className="flexible-column">
        <h3 className="talk-title">{this.props.talk.name}</h3>
        { this.props.talk.speakers ? (<h5>{this.props.talk.speakers}</h5>) : null }
        <div>
          <div className="stars">
            <Rating
              empty={'fa fa-star-o'}
              full={'fa fa-star'}
              name={'test'}
              initialRate={this.props.talk.averageRating}
              onClick={this.onStarRatingPress.bind(this)}
            />
          </div>
        </div>
        <Link className="button" to={`/details/${this.props.talk.id}`}>COMMENTS</Link>
      </div>
    )
  }
}
