import React, { Component } from 'react'
import { connect } from 'react-redux'
import Event from '../components/Event'
import moment from 'moment'

class HelloWorldContainer extends Component {
  render() {
    const { events, start } = this.props
    return (
      <div>
        <h1>Startup Events</h1>
        <div>Showing: {moment(start).format('MMM YYYY')}</div>
        <div><a href={`/date/2016/10/01`}>Prev</a></div>
        <div><a href={`/date/2016/10/01`}>Next</a></div>
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
    events: state.events,
    start: state.start
  }
}

export default connect(mapState)(HelloWorldContainer)
