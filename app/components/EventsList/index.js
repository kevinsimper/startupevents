import React, { Component } from 'react'
import Event from '../Event'
import styles from './style.scss'

export default class EventsList extends Component {
  render() {
    const { events } = this.props
    return (
      <div className={styles.EventsList}>
        {events.map((event) => {
          return (
            <Event event={event}/>
          )
        })}
      </div>
    )
  }
}
