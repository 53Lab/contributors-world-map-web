import React, { Component } from 'react'
import './RepoForm.css'

class RepoForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      repo: '',
      valid: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const repoValue = e.target.value
    this.setState({
      valid: isValidRepo(repoValue),
      repo: repoValue
    })
  }

  handleSubmit (e) {
    if (this.state.valid) {
      let form = document.getElementById('repoForm')
      let eventUpdate = new CustomEvent(this.props.event, {
        detail: this.state.repo
      })
      // communicate with map component
      form.dispatchEvent(eventUpdate)
    }
    e.preventDefault()
  }

  render () {
    return (
      <form id="repoForm" className="repoForm" onSubmit={this.handleSubmit}>
        <input type="text" className={this.state.valid ? 'valid' : 'error'}
          title="Pick a project from github, example: vuejs/vue"
          onChange={this.handleChange}
          value={this.state.repo} placeholder={this.props.phText}/>
        <input className="button-primary" type="submit" value="map"/>
      </form>
    )
  }
}

function isValidRepo (str) {
  const parts = str.split('/').filter((part) => part.trim())
  return parts.length === 2
}

export default RepoForm
