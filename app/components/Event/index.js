import React, { Component } from 'react'
import styles from './style.scss'
import moment from 'moment'

export default class Event extends Component {
  render() {
    const { event } = this.props
    let start = moment(event.start)
    let end = moment(event.end)
    return (
      <div className={styles.Event}>
        <h3>{event.title}</h3>
        <div>
          <strong>{start.format('DD/MM | HH:mm')} - {end.format('HH:mm')}</strong>
        </div>
        <div>{event.description}</div>
      </div>
    )
  }
}
