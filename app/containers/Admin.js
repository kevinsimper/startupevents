import React, { Component } from 'react'
import { connect } from 'react-redux'

class Admin extends Component {
  render() {
    const { events } = this.props
    return (
      <div>
        <h1>Admin</h1>
        <p>This is the weeks showing:</p>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => {
              return (
                <tr key={i}>
                  <td>{event.id}</td>
                  <td>{event.title}</td>
                  <td><a href={`/admin/events/${event.id}`}>Edit</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapState(state) {
  return {
    events: state.events
  }
}

export default connect(mapState)(Admin)
