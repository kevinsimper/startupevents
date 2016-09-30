import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventsList from '../components/EventsList'
import DateNavigation from '../components/DateNavigation'

class HelloWorldContainer extends Component {
  render() {
    const { events, start } = this.props
    return (
      <div>
        <DateNavigation start={start}/>
        <EventsList events={events}/>
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
