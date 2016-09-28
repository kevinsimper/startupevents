import React, { Component } from 'react'
import { connect } from 'react-redux'
import Event from '../components/Event'

class HelloWorldContainer extends Component {
  render() {
    const { events } = this.props
    return (
      <div>
        <h1>Startup Events</h1>
        <div>
          {events.map((event) => {
            return (
              <Event event={event}/>
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
