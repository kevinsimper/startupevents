import React, { Component } from 'react'

export default class Layout extends Component {
  getAnalytics() {
    return {
      __html: ``
    }
  }
  render() {
    const { assets, title } = this.props
    return (
      <html>
        <head>
          {title.toComponent()}
          <link rel="shortcut icon" href={'/favicon.png'}/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <body>
          <div id='wrapper'>
            {this.props.children}
          </div>
          <script src={assets.main.js}></script>
        </body>
      </html>
    )
  }
}
