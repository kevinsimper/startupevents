import React, { Component } from 'react'
import styles from './style.scss'
import Helmet from 'react-helmet'
import cx from 'classnames'

export default class Main extends Component {
  render() {
    let ContentClasses = cx({
      [styles.Content]: true,
    })
    return (
      <div className={styles.wrapper}>
        <Helmet
          defaultTitle={'Startup Events'}
        />
        <div className={ContentClasses}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
