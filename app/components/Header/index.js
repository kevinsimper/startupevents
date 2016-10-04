import React, { Component } from 'react'
import styles from './style.scss'
import Navigation from '../Navigation'

export default class Header extends Component {
  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.Header}>
          <h1>Startup Events in Copenhagen</h1>
        </div>
        <Navigation/>
      </div>
    )
  }
}
