import React, { Component } from 'react'
import MenuBar from './Components/MenuBar'
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
        <MenuBar options={['heston']}/>
      </div>
    );
  }
}

export default App