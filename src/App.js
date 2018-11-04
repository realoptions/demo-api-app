import React, { Component } from 'react'
import Form from './Views/Form'
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
        <Form fields={fields}/>
      </div>
    );
  }
}

export default App