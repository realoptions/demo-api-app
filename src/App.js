import React, { Component } from 'react'
import BottomBar from './Components/BottomBar'
import MenuBar from './Components/MenuBar'
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar/>
        <BottomBar/>
      </div>
    )
  }
}

export default App