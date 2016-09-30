import React, { Component } from 'react'
import styles from './style.scss'

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.Header}>Startup Events in Copenhagen</h1>
      </div>
    )
  }
}
