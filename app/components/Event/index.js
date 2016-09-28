import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    const { event } = this.props
    return (
      <div>
        <h3>{event.title}</h3>
        <div>{event.description}</div>
      </div>
    )
  }
}
