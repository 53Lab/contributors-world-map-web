import React, { Component } from 'react'

class LabelDate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: null
    }
  }

  render () {
    return this.state.date
      ? <p>Cached at {getDate(this.state.date)}</p>
      : <p>test</p>
  }
}

function getDate (number) {
  const date = new Date(number)
  return date.toLocaleTimeString()
}

export default LabelDate
