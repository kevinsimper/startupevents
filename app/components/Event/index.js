import React, { Component } from 'react'
import styles from './style.scss'
import moment from 'moment'
import xss from 'xss'
import autolinks from 'autolinks'

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
        <div dangerouslySetInnerHTML={{__html: autolinks(xss(event.description.trim().replace(/(?:\r\n|\r|\n)/g, '<br />')))}}></div>
      </div>
    )
  }
}
