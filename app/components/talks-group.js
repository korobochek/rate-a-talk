import React, { Component } from 'react'

import Talk from 'components/talk'

export default class TalksGroup extends Component {
  static propTypes = {
    talks: React.PropTypes.array,
    grouping: React.PropTypes.string
  }

  render() {
    return (
      <div>
        <div className="flexible-box">
          <h2>{this.props.grouping}</h2>
        </div>
        <div className="flexible-box">
          { this.props.talks ?
          this.props.talks.map(talk =>
            (<div className="flexible-component" key={talk.id}><Talk talk={talk}></Talk></div>)) : null
          }
        </div>
      </div>
    )
  }
}
