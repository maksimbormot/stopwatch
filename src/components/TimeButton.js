import React, { Component } from 'react'

export default class TimmeButton extends Component {

  render() {

    const {handler, label} = this.props

    return (
      <div>
        <button
          onClick={handler}
        >
        {label}
        </button>
      </div>
    )
  }
}
