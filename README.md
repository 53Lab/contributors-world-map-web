# :earth_africa: GitHub contributors world map by location (WIP)
Watch in a map the contributors to a given open source project in github based on its location.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)]()


## How this work ?
I built a small API that fetch from [GitHub API](https://developer.github.com/v3/) the info needed from a given user/repository and save it. Then I mark on the Map the *location* field of the first **100 contributors** to the repository selected. Yes, it's simple, it should be :)  
I will eventually made public the API used as well.

## Tips
- Click the markers on the map to watch contributors info.

### Contribute
- Clone this repository:   
 `$ git clone https://github.com/53Lab/contributors-world-map-web.git`   
- `$ npm install`    
- Run in local (dev mode against prod API):   
  `$ npm run start-prod`  
- Run tests in local:  
  `$ npm test`

**Any contributions is welcome**, better than open an issue, fix it yourself!

#### License
MIT © [Julio C. Martin](https://twitter.com/juliomatcom)
