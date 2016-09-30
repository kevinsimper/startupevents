import React, { Component } from 'react'
import { connect } from 'react-redux'
import Event from '../components/Event'
import moment from 'moment'

class HelloWorldContainer extends Component {
  render() {
    const { events, start } = this.props
    let today = moment(start)
    let todayFormat = today.format('DD MMM YYYY')
    let prev = today.clone().subtract(7, 'days').format('YYYY/MM/DD')
    let next = today.clone().add(7, 'days').format('YYYY/MM/DD')
    return (
      <div>
        <h1>Startup Events</h1>
        <div>Showing: {todayFormat}</div>
        <div><a href={`/date/${prev}`}>Prev</a></div>
        <div><a href={`/date/${next}`}>Next</a></div>
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
