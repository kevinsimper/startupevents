import React, { Component } from 'react'
import { connect } from 'react-redux'

class HelloWorldContainer extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}

function mapState(state) {
  return {}
}

export default connect(mapState)(HelloWorldContainer)
