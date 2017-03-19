import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }
  render() {
    return (
        <form className="store-selector" onSubmit={(e) => {this.goToStore(e)}}/*this.goToStore.bind(this)}*/>
          { /*Hello this is how you comment in jsx. Don't put at top level or 
              it will try to return as a top level object.*/ }
          <h2>Please Enter A Store</h2>
          <input type="text" required placeholder="Store Name"
            defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}/>
          <button type="submit">Visit Store -></button>
        </form>
      );
  }
}

// Tell react that the StorePicker component is expecting a router component
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;