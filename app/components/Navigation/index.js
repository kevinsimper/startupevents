import React, { Component } from 'react'
import styles from './style.scss'

export default class Navigation extends Component {
  render() {
    return (
      <div className={styles.Navigation}>
          <a href='/login'>Login</a>
          <a href='/addevent'>Add Event</a>
          <a href='/about'>About</a>
      </div>
    )
  }
}
