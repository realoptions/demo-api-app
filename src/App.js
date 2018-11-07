import React, { Component } from 'react'
import BottomBar from './Components/BottomBar'
import './App.css';
const fields={
  'some name':{
      lower:-1,
      upper:1
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <BottomBar/>
      </div>
    )
  }
}

export default App