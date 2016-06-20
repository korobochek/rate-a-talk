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
        }
      }
    })
  }

  render() {
    const ratingsCount = _.filter(this.state.talk.ratings, rating => rating.rating && rating.rating != 0).length
    return (
      <div className="flexible-box">
        <div className="flexible-component">
          <h1 className="talk-title">{ this.state.talk.name }</h1>
        </div>
        {this.state.talk.speakers ?
          (<div className="flexible-component">
            <h3>{ this.state.talk.speakers }</h3>
           </div>) : null
        }
        <div className="flexible-component">
          <div className="flexible-box">
            <div className="flexible-component">
              <h4>Current Rating is {this.state.talk.averageRating}/5</h4>
            </div>
            { this.state.talk.ratings ?
              (<div className="flexible-component">with {ratingsCount} votes</div>) : null
            }
          </div>
        </div>
        <div className="flexible-component">
          <CustomRating readonly={false} initialRate={0} talkId={this.state.talk.id} />
        </div>
        <div className="flexible-component">
          <textarea
            className="commentses"
            onChange={event => this.setState(_.merge(this.state, { comment: event.target.value })) }
          />
          <button className="button" onClick={ event => this.saveComment(this.state.talk.id, this.state.comment) }>Save</button>
        </div>
      </div>
    )
  }
}
