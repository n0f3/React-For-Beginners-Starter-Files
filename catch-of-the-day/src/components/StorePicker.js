import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
  }
  render() {
    return (
        <form className="store-selector" onSubmit={this.goToStore}>
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
export default StorePicker;