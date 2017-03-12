import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

class App extends React.Component {
  constructor() {
    super();

    // bind helpers i.e. allows use of 'this' for custom methods
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    
    // initial state
    this.state = {
      fishes: {},
      order:  {}
    };
  }

  componentWillMount() {
    // this runs right before <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeID}/fishes`
    , {
      context: this,
      state: 'fishes'
    });

    // check if there is an order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeID}`);

    if(localStorageRef) {
      // update the App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeID}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // update our state
    // this creates a copy of the existing fishes state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes })
    // this.setState({ fishes: fishes })  // this is the same as the line above

  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update the order: if fish already ordered increment by one or add a new fish
    order[key] = order[key] + 1 || 1;
    // update our state; {order} is the same as {order: order}
    this.setState({ order });
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
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          params={this.props.params}
        />
        <Inventory 
          addFish={this.addFish} 
          loadSamples={this.loadSamples} 
        />
      </div>
      )
  }
}

export default App;
