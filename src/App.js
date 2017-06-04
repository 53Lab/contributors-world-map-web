import React, { Component } from 'react'
import './App.css'
import RepoForm from './components/RepoForm.js'
import MapElem from './components/Map.js'

class App extends Component {
  render () {
    return (
      <div className="container App">
        <h1>
          GitHub contributors world map
          <a href="https://github.com/53Lab/contributors-world-map-web" target="_blank">
            <img className="help-icon" title="See more information about this."
              src="./imgs/1496417895_Info_Circle_Symbol_Information_Letter.png" />
          </a>
        </h1>
        <h6>Choose a <strong>repository</strong> and watch its contributors <u>locations</u> on Map</h6>
        <RepoForm
          phText=":user/:repository"
          event="repoUpdated">
        </RepoForm>
        <MapElem form="repoForm" event="repoUpdated"></MapElem>

        <div className="footer">
          <iframe 
            src="https://ghbtns.com/github-btn.html?user=53Lab&repo=contributors-world-map-web&type=star&count=true&size=large"
            frameBorder="0" scrolling="0" width="160px" height="30px">
          </iframe>

          <iframe 
            src="https://ghbtns.com/github-btn.html?user=53Lab&repo=contributors-world-map-web&type=fork&count=true&size=large"
            frameBorder="0" scrolling="0" width="158px" height="30px">
          </iframe>
          <p>Say hi! <a href="https://twitter.com/juliomatcom">@juliomatcom</a></p>
        </div>
      </div>
    )
  }
}

export default App
