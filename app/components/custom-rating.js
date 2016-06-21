import $ from 'jquery'
import _ from 'lodash'
import React, { Component } from 'react'
import Rating from 'react-rating'
import { connect } from 'react-redux'

import 'stylesheets/talks.scss'
import { userRatingAction } from 'redux-stuff/rating-reducer'

class CustomRating extends Component {
  static propTypes = {
    readonly: React.PropTypes.bool,
    initialRate: React.PropTypes.number,
    talkId: React.PropTypes.number,
    userRating: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { success: false, readonly: this.props.readonly }
  }

  onStarRatingPress(value, name) {
    const ratingData = { rating: value, talkId: this.props.talkId }
    $.ajax({
      type: 'POST',
      url: '/ratings',
      data: JSON.stringify(ratingData),
      contentType: 'application/json',
      dataType: 'json',
      success: responseBody => {
        this.setState({ success: true, readonly: true })
      },
      error: xhr => {
        if (xhr.status != 201) {
          window.location = '/500.html'
        } else {
          this.props.dispatch(userRatingAction(value, this.props.talkId))
          this.setState({ success: true, readonly: true })
        }
      }
    })
  }

  render() {
    return (
      <div>
        <div className="stars">
          <Rating
            empty={'fa fa-star-o'}
            full={'fa fa-star'}
            name={'test'}
            initialRate={this.props.initialRate}
            onClick={this.onStarRatingPress.bind(this)}
            readonly={this.state.readonly}
          />
        </div>
        { this.state.success ? (
          <div className="thank-you-hero">Thank you</div>
          ) : null }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    userRating: state.userRating
  }
}

export default connect(mapStateToProps)(CustomRating)

