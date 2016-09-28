import React, { Component } from 'react'
import { connect } from 'react-redux'

class HelloWorldContainer extends Component {
  render() {
    const { events } = this.props
    return (
      <div>
        <h1>Hello World</h1>
        <div>
          {events.map((event) => {
            return (
              <div>{event.title}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    events: state.events
  }
}

export default connect(mapState)(HelloWorldContainer)
