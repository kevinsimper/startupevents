import React, { Component } from 'react'
import { connect } from 'react-redux'

class AdminEvent extends Component {
  render() {
    const { event } = this.props
    return (
      <div>
        <h1>Edit Event</h1>
        <pre>
          <code>
            { JSON.stringify(event, null, 2)}
          </code>
        </pre>
      </div>
    )
  }
}

function mapState(state) {
  return {
    event: state.event
  }
}

export default connect(mapState)(AdminEvent)
