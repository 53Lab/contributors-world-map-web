/*global L*/
import React, { Component } from 'react'
import 'whatwg-fetch'
let map

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repo: '',
      date: null
    }
  }

  componentDidMount () {
    const form = document.getElementById(this.props.form)
    if (form) {
      form.addEventListener (this.props.event, (e) => {
        this.setState({
          repo: e.detail
        })

        updateMap.bind(this)(e.detail)
      })
    }
  }

  componentWillUnmount () {
    const form = document.getElementById(this.props.form)
    if (form) {
      form.removeEventListener(this.props.event)
    }
  }

  render () {
    const mapStyle = {
      minHeight: '600px',
      maxWidth: '900px',
      backgroundImage: "url('./imgs/github.gif')",
      backgroundRepeat: 'no-repeat'
    }
    const spanStyle = {
      display: this.state.date ? 'block' : 'none'
    }

    return (
      <div>
        <div id="map" style={mapStyle}></div>
        <span style={spanStyle}>{this.state.date ? `Cached since: ${getDate(this.state.date)}` : ''}</span>
      </div>
    )
  }
}

function updateMap (repo) {
  if (map) {
    map.remove()
  }
  // call API
  fetchRepo(repo)
    .then(initMap)
    .then(updateState.bind(this))
}

function fetchRepo (repo) {
  const HOST = 'http://localhost:3005/'
  const url = `${HOST}${repo}`
  const options = {
    credentials: 'include'
  }
  return fetch(url, options)
    .then(function(response) {
      return response.status === 200 ? response.json() : {}
    }).catch(function(ex) {
      console.error('parsing failed', ex)
    })
}

function initMap (data) {
  const contributors = data.contributors
  map = L.map('map', {
     center: [51.505, -0.09], // London
     zoom: 2
   })
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  contributors.forEach(addToMap)
  return data
}

function addToMap (contributor) {
  if (contributor.city) {
    const point = [contributor.city.lat, contributor.city.lon]
    const opts = {
      title: contributor.name || contributor.login
    }
    const msg = `<b>${contributor.login}</b> (${contributor.location})<br/>`
      + `<a href="${contributor.url}" target="_blank">${contributor.url}</a>`
    // add markers
    L.marker(point, opts)
      .addTo(map)
      .bindPopup(msg)

    return true
  }
  return false
}

function updateState (data) {
  this.setState({
    date: data.date
  })
}

function getDate (number) {
  return new Date(Number(number)).toUTCString()
}

export default Map
