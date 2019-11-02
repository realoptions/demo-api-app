| [Linux][lin-link] | [Codecov][cov-link] |
| :---------------: | :-----------------: |
| ![lin-badge]      | ![cov-badge]        |

[lin-badge]: https://github.com/realoptions/demo-api-app/workflows/test/badge.svg
[lin-link]:  https://github.com/realoptions/demo-api-app/actions
[cov-badge]: https://codecov.io/gh/realoptions/demo-api-app/branch/master/graph/badge.svg
[cov-link]:  https://codecov.io/gh/realoptions/demo-api-app


## Demo App for RealOptions

This shows off some of the capabilities of the RealOptions API.  

## Development

To develop, clone this repo.  Install dependencies via `npm install`.  Then run `npm run download-docs`.  Note this will only work on *nix operating systems.  Then run `npm run mock-api-background` or `npm run mock-api` to start the mock server.  The first command will run the mock server in the background.  To run the web client, run `npm start`.  