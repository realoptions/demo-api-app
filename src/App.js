import React from 'react'
import BottomBar from './Components/BottomBar'
import MenuBar from './Components/MenuBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from './Reducers'
import Theme from './Themes'
import DensityChart from './Views/DensityChart'
import OptionChart from './Views/OptionChart'
import Inputs from './Views/Inputs'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { inputs, density, options } from './Routes'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  app: {
    backgroundColor: theme.palette.common.white,
    height: '100vh',
    textAlign: 'center'
  }
})
const theme = createMuiTheme(Theme)
const store = createStore(modelApp)
const App = ({ classes }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={classes.app}>
          <MenuBar />
          <Switch>
            <Route path={inputs} component={Inputs} />
            <Redirect from="/" to={inputs} exact />
          </Switch>
          <Route path={density} component={DensityChart} />
          <Route path={options} component={OptionChart} />
          <Route path="/:selected" component={BottomBar} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
)

export default withStyles(styles)(App)
