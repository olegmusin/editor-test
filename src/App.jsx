import React, { Component } from 'react';

import './main.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* <!-- side pane --> */}
        <div className="sidepane col-sm-2 col-md-2 col-lg-2">
          <div className="form">
            <h3>Form</h3>
            <input
              type="file"
              className="form-control"
              placeholder="Upload Your Images"
              name="upload"
            />
            <button id="submit" className="btn btn-default">upload</button>
            {/* <!-- Upload Form here --> */}
          </div>
          <div className="assets">
            <h3>Assets</h3>
            <div className="text">
              <h4>Text</h4>
              <button id="addText" className="btn btn-default">Add Text</button>
            </div>
            <div className="image">
              <h4>Images</h4>
              <ul className="list-unstyled">
                {/* <!-- List of images here --> */}
                {/* <!-- <li><img src="images/sample.jpeg" class="img-rounded" /></li> --> */}
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- canvas --> */}
        <div className="canvas col-sm-8 col-md-8 col-lg-8">
          <div className="block">
            {/* <!-- Add images and texts to here --> */}
          </div>
        </div>
      </div>);
  }
}

export default App;
