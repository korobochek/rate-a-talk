import $ from 'jquery'
import _ from 'lodash'
import React, { Component } from 'react'

import Talk from 'components/talk'
import TalksGroup from 'components/talks-group'

export default class TalksList extends Component {
  constructor(props) {
    super(props)
    this.state = { talks: [] }
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/talks',
      contentType: 'application/json',
      dataType: 'json',
      success: responseBody => this.setState({ talks: responseBody }),
      error: xhr => window.location = '/500.html'
    })
  }

  talksGroupedByDate(talks) {
    return _.groupBy(talks, 'day')
  }

  renderGroupedTalks(day, talks) {
    return (<div className="flexible-box" key={Math.random()}>day</div>)
  }

  render() {
    const groupedTalks = this.talksGroupedByDate(this.state.talks)
    return (
      <div>
        <div className="flexible-box">
          <h1 className="hero flexible-title">Agile Australia 2016</h1>
        </div>
        <div className="flexible-box">
          <h2 className="flexible-title">Talks</h2>
        </div>
        <TalksGroup talks={groupedTalks['Monday 20 June 2016']} grouping={'Monday 20 June 2016'} />
        <TalksGroup talks={groupedTalks['Tuesday 21 June 2016']} grouping={'Tuesday 21 June 2016'} />
      </div>
    )
  }
}
