import React, { Component } from 'react'
import BottomBar from './Components/BottomBar'
import MenuBar from './Components/MenuBar'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import modelApp from './Reducers'
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})
const store = createStore(modelApp)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <MenuBar />
            <BottomBar />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
