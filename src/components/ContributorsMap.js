/* global fetch */
import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'whatwg-fetch'
import './ContributorsMap.css'
import ENV from '../env.json'

class ContributorsMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: null,
      contributors: [],
      repo: '',
      error: false
    }
    this.updateMapState = this.updateMapState.bind(this)
    this.alertIfError = this.alertIfError.bind(this)
  }

  componentDidMount () {
    const form = document.getElementById(this.props.form)
    if (form) {
      form.addEventListener(this.props.event, (e) => {
        this.setState({
          repo: e.detail
        })
        const loadingImg = document.querySelector(this.props.imgSelector)
        loadingImg.style.display = 'inline'

        fetchRepo(e.detail)
          .then(this.updateMapState)
          .then(this.alertIfError)
          .then(hideElem(loadingImg))
          .catch(hideElem(loadingImg))
      })
    }
  }

  componentWillUnmount () {
    const form = document.getElementById(this.props.form)
    if (form) {
      form.removeEventListener(this.props.event)
    }
  }

  getMarkerJSX (contributor) {
    const point = [contributor.city.lat, contributor.city.lon]
    return <Marker key={contributor.login} position={point}>
      <Popup>
        <div>
          <b>{contributor.login}</b> ({contributor.location})<br />
          <a href={contributor.url} target='_blank' rel='noopener noreferrer'>
            {contributor.url}
          </a>
        </div>
      </Popup>
    </Marker>
  }

  updateMapState (data) {
    const resultOk = data && data.date && data.contributors
    this.setState({
      date: resultOk ? data.date : null,
      contributors: resultOk ? data.contributors : [],
      error: !resultOk
    })
  }

  alertIfError () {
    if (this.state.error) {
      alert('There is no info for this user/repo')
    }
  }

  render () {
    const spanStyle = {
      display: this.state.date ? 'block' : 'none'
    }
    const opts = {
      center: [51.505, -0.09], // London
      zoom: 2
    }
    const markers = this.state.contributors
      .filter(contributor => contributor.city)
      .map(this.getMarkerJSX)

    return (
      <div id="mapContainer" className={this.state.error ? 'invalid' : 'valid'}>
        <Map center={opts.center} zoom={opts.zoom}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          {markers}
        </Map>
        <span style={spanStyle}>{this.state.date ? `Cached since: ${getDate(this.state.date)}` : ''}</span>
      </div>
    )
  }
}

function fetchRepo (repo) {
  const url = `${ENV.HOST}${repo}`
  return fetch(url)
    .then(function (response) {
      return response.status === 200 ? response.json() : {}
    }).catch(function (ex) {
      console.error('parsing failed', ex)
    })
}

function getDate (number) {
  return new Date(Number(number)).toUTCString()
}

function hideElem (elem) {
  return () => {
    elem.style.display = 'none'
  }
}

export default ContributorsMap
