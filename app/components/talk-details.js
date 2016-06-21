import $ from 'jquery'
import _ from 'lodash'
import React, { Component } from 'react'
import CustomRating from 'components/custom-rating'

export default class TalkDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { talk: {}, comment: '', success: false }
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

  render() {
    const ratingsCount = _.filter(this.state.talk.ratings, rating => rating.rating && rating.rating != 0).length
    const comments = _.map(_.filter(this.state.talk.ratings,
                                    rating => rating.comment && rating.comment != 0),
                           rating => rating.comment)
    const commentsClass = this.state.success ? "comments cannot-input" : "comments"
    return (
      <div className="flexible-box ratings-detail">
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
            <div className="hero-rating">{this.state.talk.averageRating}/5</div>
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
    )
  }
}
