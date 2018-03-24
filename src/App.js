import React, { Component } from 'react';
import './App.css';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top100Days: [],
      top100AllTime: [],
      current: true
    }
    this.onDisplay30Days = this.onDisplay30Days.bind(this);
    this.onDisplayAllTime = this.onDisplayAllTime.bind(this);
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
  onDisplay30Days() {
    this.setState({
      current: true
    })
  }
  onDisplayAllTime() {
    this.setState({
      current: false
    })
  }
  render() {
    const t1 = this.state.top100Days.map((row, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td><Image src={row.img} className="image" circle /> {row.username}</td>
        <td>{row.recent}</td>
        <td>{row.alltime}</td>
      </tr>
    ))
    const t2 = this.state.top100AllTime.map((row, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td><Image src={row.img} className="image" circle /> {row.username}</td>
        <td>{row.recent}</td>
        <td>{row.alltime}</td>
      </tr>
    ))
    return (
      <div className="App container">
        <Navbar>
          <Navbar.Brand>Camper Leaderboard</Navbar.Brand>
          <div className="nav">
            <Button onClick={this.onDisplay30Days}>Last 30 Days</Button>
              <Button onClick={this.onDisplayAllTime}>All Time</Button>
          </div>
        </Navbar>
        <br/>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th>Points in 30 days</th>
              <th>All Time Points</th>
            </tr>
          </thead>
          <tbody>
            {this.state.current ? t1 : t2}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
