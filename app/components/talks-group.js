import $ from 'jquery'
import React, { Component } from 'react'

import Talk from 'components/talk'
import 'stylesheets/talks-group.scss'

export default class TalksGroup extends Component {
  static propTypes = {
    talks: React.PropTypes.array,
    grouping: React.PropTypes.string
  }

  toggleMondaySessions() {
    if ($('#toggle').hasClass('fa-angle-down')) {
      $('#toggle').removeClass('fa-angle-down')
      $('#toggle').addClass('fa-angle-up')
      $('#yesterday-talks').css('display', 'inline-flex')
    } else {
      $('#toggle').removeClass('fa-angle-up')
      $('#toggle').addClass('fa-angle-down')
      $('#yesterday-talks').css('display', 'none')
    }
  }

  render() {
    const grouping = this.props.grouping
    const yesterdayTalksId = grouping === 'Monday 20 June 2016' ? 'yesterday-talks' : ''
    const talksGroupClass = yesterdayTalksId === '' ? 'tuesday' : 'monday'
    return (
      <div className={talksGroupClass}>
        <div className="flexible-box date-title" onClick={event => { this.toggleMondaySessions() }}>
          <h2>{grouping}</h2>
          { yesterdayTalksId != '' ? <i id="toggle" className="fa fa-angle-down"></i> : null}
        </div>
        <div className="flexible-box" id={yesterdayTalksId}>
          { this.props.talks ?
          this.props.talks.map(talk =>
            (<div className="flexible-component" key={talk.id}><Talk talk={talk}></Talk></div>)) : null
          }
        </div>
      </div>
    )
  }
}
