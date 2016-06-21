import $ from 'jquery'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import CustomRating from 'components/custom-rating'
import { recalculateAverage } from 'helpers/rating-calculator'

import 'stylesheets/talks.scss'

class Talk extends Component {
  static propTypes = {
    talk: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="flexible-column">
        <h2 className="talk-title">{this.props.talk.name}</h2>
        { this.props.talk.speakers ? (<h2 className="talk-speaker">{this.props.talk.speakers}</h2>) : null }
        <div>
          <div className="annotation">
            Average rating so far: {recalculateAverage(this.props.talk, this.props.userRating)}
          </div>
          <div>
            <div>Rate: </div>
            <CustomRating readonly={false} initialRate={0} talkId={this.props.talk.id} />
          </div>
        </div>
        <Link className="button" to={`/details/${this.props.talk.id}`}>View and leave feedback</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userRating: state.userRating
  }
}

export default connect(mapStateToProps)(Talk)
