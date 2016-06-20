import $ from 'jquery'
import React, { Component } from 'react'
import Rating from 'react-rating'

import 'stylesheets/talks.scss'

export default class CustomRating extends Component {
  static propTypes = {
    readonly: React.PropTypes.bool,
    initialRate: React.PropTypes.number,
    talkId: React.PropTypes.number
  }

  onStarRatingPress(value, name) {
    console.log('wtf')
    const ratingData = { rating: value, talkId: this.props.talkId }
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
      <div className="stars">
        <Rating
          empty={'fa fa-star-o'}
          full={'fa fa-star'}
          name={'test'}
          initialRate={this.props.initialRate}
          onClick={this.onStarRatingPress.bind(this)}
          readonly={this.props.readonly}
        />
      </div>
    )
  }
}
