import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'whatwg-fetch'
import './ContributorsMap.css'

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
  }

  componentDidMount () {
    const form = document.getElementById(this.props.form)
    if (form) {
      form.addEventListener (this.props.event, (e) => {
        this.setState({
          repo: e.detail
        })
      const loadingImg = document.querySelector(this.props.imgSelector)
      loadingImg.style.display = 'inline'

        fetchRepo(e.detail)
          .then(this.updateMapState)
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
          <b>{contributor.login}</b> ({contributor.location})<br/>
          <a href={contributor.url} target="_blank" rel="noopener noreferrer">
            {contributor.url}
          </a>
        </div>
      </Popup>
    </Marker>
  }

  updateMapState (data) {
    if (data && data.date && data.contributors) {
      this.setState({
        date: data.date,
        contributors: data.contributors,
        error: false
      })
    } else {
      this.setState({
        error: true
      })
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
      <div>
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

function getDate (number) {
  return new Date(Number(number)).toUTCString()
}

function hideElem (elem) {
  return (elm) => elem.style.display = 'none'
}

export default ContributorsMap
