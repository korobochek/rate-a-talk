import $ from 'jquery'
import React, { Component } from 'react'
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
      <div>
        <h4>{this.props.talk.name}</h4>
        { this.props.talk.speakers ? (<h5>{this.props.talk.speakers}</h5>) : null }
        <Rating
          empty={'fa fa-star-o'}
          full={'fa fa-star'}
          name={'test'}
          initialRate={this.props.talk.averageRating}
          onClick={this.onStarRatingPress.bind(this)}
        />
      </div>
    )
  }
}
