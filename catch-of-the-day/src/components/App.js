import React from 'react';
import StorePicker from './StorePicker';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor() {
    super();
    // need to bind the method to the object to make it available
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    // This is going to be our initial state for the class
    this.state = {
        fishes: {},
        order: {}
    };
  }
  addFish(fish) {
    // update our state
    // take a copy of our existing state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now(); // gets current time in milliseconds
    fishes[`fish-${timestamp}`] = fish;
    // set state
    // we are telling react that we just changed this single piece of the state
    // without having to update the entire state.
    this.setState({ fishes: fishes });
  }
  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
            }
          </ul>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App;