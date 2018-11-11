import React, { Component } from 'react'
import BottomBar from './Components/BottomBar'
import MenuBar from './Components/MenuBar'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from './Reducers'
import Theme from './Themes'
import DensityChart from './Views/DensityChart'
import OptionChart from './Views/OptionChart'
import Inputs from './Views/Inputs'
import { HashRouter as Router, Route } from 'react-router-dom'
import { inputs, density, options } from './Routes'
const theme = createMuiTheme(Theme)
const store = createStore(modelApp)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className="App">
              <MenuBar />
              <Route path={inputs} component={Inputs} />
              <Route path={density} component={DensityChart} />
              <Route path={options} component={OptionChart} />
              <BottomBar />
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
