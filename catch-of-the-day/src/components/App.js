import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    // need to bind the method to the object to make it available
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    // This is going to be our initial state for the class
    this.state = {
        fishes: {},
        order: {}
    };
  }
  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
    //check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef) {
      // Update our app component order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
      console.log(`${JSON.stringify(this.state)}`)
    }
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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
  updateFish(key, newFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = newFish;
    this.setState({fishes});
  }
  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
  }
  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }
  addToOrder(key) {
    // make a copy of our state
    const order = {...this.state.order};
    // Update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }
  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
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
                .map(key => 
                  <Fish key={key} index={key} details={this.state.fishes[key]} orderDetails={this.state.order[key]}
                    addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}/>
        <Inventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples} 
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}/>
      </div>
    )
  }
}

export default App;