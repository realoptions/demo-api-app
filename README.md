| [Linux][lin-link] | [Codecov][cov-link] |
| :---------------: | :-----------------: |
| ![lin-badge]      | ![cov-badge]        |

[lin-badge]: https://travis-ci.com/realoptions/demo-api-app.svg?branch=master "Travis build status"
[lin-link]:  https://travis-ci.com/realoptions/demo-api-app "Travis build status"
[cov-badge]: https://codecov.io/gh/realoptions/demo-api-app/branch/master/graph/badge.svg
[cov-link]:  https://codecov.io/gh/realoptions/demo-api-app


## Demo App for RealOptions

This shows off some of the capabilities of the RealOptions API.  

## Development

To develop, clone this repo.  Install dependencies via `npm install`.  Then run `npm run download-docs`.  Note this will only work on *nix operating systems.  Then run `npm run mock-api` or `./mockserver/apisprout ./mockserver/openapi.yaml`.  The first command will run the mock server in the background while the second will take up the terminal.  To run the web client, run `npm start`.  