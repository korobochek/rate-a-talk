import $ from 'jquery'
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import CustomRating from 'components/custom-rating'
import { recalculateAverage } from 'helpers/rating-calculator'
import Progress from 'components/progress'

import "stylesheets/common.scss"

class TalkDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { talk: {}, comment: '', success: false, loading: true }
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: `/talks/${this.props.params.talkId}`,
      contentType: 'application/json',
      dataType: 'json',
      success: responseBody => this.setState({ talk: responseBody, loading: false }),
      error: xhr => window.location = '/500.html'
    })
  }

  saveComment(talkId, comment) {
    const commentData = { comment: comment, talkId: talkId }
    $.ajax({
      type: 'POST',
      url: '/ratings',
      data: JSON.stringify(commentData),
      contentType: 'application/json',
      dataType: 'json',
      success: responseBody => {
        this.setState({ success: true })
      },
      error: xhr => {
        if (xhr.status != 201) {
          window.location = '/500.html'
        } else {
          this.setState({ success: true })
          this.state.talk.ratings.push({ rating: null, comment: comment, talkId: talkId })
          this.setState({ talk: this.state.talk })
        }
      }
    })
  }

  hasRating(userRating, talkId) {
    return userRating.rating != 0 && talkId == userRating.talkId
  }

  render() {
    const savedRatings = _.filter(this.state.talk.ratings, rating => rating.rating && rating.rating != 0)
    const ratingsCount = this.hasRating(this.props.userRating, this.state.talk.id) ? savedRatings.length + 1 : savedRatings.length
    const averageRating = recalculateAverage(this.state.talk, this.props.userRating)
    const comments = _.map(_.filter(this.state.talk.ratings,
                                    rating => rating.comment && rating.comment != 0),
                           rating => rating.comment)
    const commentsClass = this.state.success ? "comments cannot-input" : "comments"
    return (
      <div>
      <Progress loading={this.state.loading} />
      <div className={`flexible-box ratings-detail ${this.state.loading ? 'hidden' : ''}`}>
        <div className="flexible-component talk-title">
          <div className="flexible-column">
            <h1 className="talk-title">{ this.state.talk.name }</h1>
          </div>
        </div>
        {this.state.talk.speakers ?
          (<div className="flexible-component talk-speaker">
            <div className="flexible-column">
              <h2>{ this.state.talk.speakers }</h2>
            </div>
           </div>) : null
        }
        <div className="flexible-component talk-rating">
          <div className="flexible-column">
            <h2>Current Rating is</h2>
            <div className="hero-rating">{averageRating}/5</div>
            { this.state.talk.ratings ?
              (<h2>with {ratingsCount} votes</h2>) : null
            }
          </div>
        </div>
        <div className="flexible-component">
          <div className="flexible-column">
            <div className="tap-to-rate">Tap to rate</div>
            <CustomRating readonly={false} initialRate={0} talkId={this.state.talk.id} />
          </div>
        </div>
        <div className="flexible-component">
          <div className="flexible-column">
            <textarea
            className={commentsClass}
            onChange={event => this.setState(_.merge(this.state, { comment: event.target.value })) }
            />
            <button
              className="button"
              onClick={ event => this.saveComment(this.state.talk.id, this.state.comment) }
              disabled={ this.state.comment === '' || this.state.success }>
              Save
            </button>
            {this.state.success ? <div className="hero-2">Thank you</div> : null}
          </div>
        </div>
        <div className="flexible-component">
          <div className="flexible-column">
            <h2>Comments so far</h2>
            { comments.map(comment => (<div key={Math.random()}>{comment}</div>)) }
          </div>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userRating: state.userRating
  }
}

export default connect(mapStateToProps)(TalkDetails)
