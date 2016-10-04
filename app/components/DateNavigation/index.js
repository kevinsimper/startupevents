import React, { Component } from 'react'
import styles from './style.scss'
import moment from 'moment'

export default class DateNavigation extends Component {
  render() {
    let today = moment(this.props.start)
    let todayFormat = today.format('DD MMM YYYY')
    let prev = today.clone().subtract(7, 'days').format('YYYY/MM/DD')
    let next = today.clone().add(7, 'days').format('YYYY/MM/DD')
    return (
      <div className={styles.Navigation}>
        <div>
          <a className={styles.Buttons} href={`/date/${prev}`}>Prev</a>
        </div>
        <div>{todayFormat}</div>
        <div>
          <a className={styles.Buttons} href={`/date/${next}`}>Next</a>
        </div>
      </div>
    )
  }
}
