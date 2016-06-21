import React from 'react'
import Spinner from 'spin.js'

const spinnerConfig = {
  lines: 11, // The number of lines to draw
  length: 0, // The length of each line
  width: 8, // The line thickness
  radius: 16, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#fff', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent in px
  left: '50%' // Left position relative to parent in px
}

export default class Progress extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.spinner = new Spinner(spinnerConfig)
    if (this.props.loading) {
      this.spinner.spin(this.refs.spinner)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loading && !this.props.loading) {
      this.spinner.spin(this.refs.spinner)
    } else if (!newProps.loading && this.props.loading) {
      this.spinner.stop()
    }
  }

  componentWillUnmount() {
    this.spinner.stop()
  }

  render() {
    return (
      <div ref="spinner" />
    )
  }
}
