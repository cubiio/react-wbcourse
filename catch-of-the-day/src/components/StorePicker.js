import React from 'react';
import { getFunName } from '../helpers'

class StorePicker extends React.Component {

  goToStore(event) {
    console.log('You changed the URL!');
    event.preventDefault();
    // first grab the text from the input box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // second we're going to transition from / to /store/storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)} >
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
        <button type="submit">Visit Store ➡️ </button>
      </form>
    )
  }
}

// surface the router so it is accessible 
// and can be used to transition to user created url
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
