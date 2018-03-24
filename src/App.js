import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top100Days: [],
      top100AllTime: []
    }
  }
  componentWillMount() {
    const top100Days = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
                        .then(res => res.json());
    const top100AllTime = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
                        .then(res => res.json());
    Promise.all([top100Days, top100AllTime])
      .then(data => {
        console.log(data)
        this.setState({ 
          top100Days: data[0],
          top100AllTime: data[1] 
        })
        }
      )
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
