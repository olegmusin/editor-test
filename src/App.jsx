import React from 'react';

import './main.css';
import './bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadText = this.handleUploadText.bind(this);
  }

  handleUploadImage() {
    console.log('#imageUpload', !!this);
  }

  handleUploadText() {
    console.log('#textUpload', !!this);
  }

  render() {
    return (
      <div>
        <div className="sidepane col-sm-4 col-md-4 col-lg-4">
          <div>
            <h3>Tools</h3>
            <hr />
            <div className="form-group">
              <input
                type="file"
                name="file"
                id="file"
                className="form-control"
              />
              <button onClick={this.handleUploadImage} className="btn btn-info">
                Upload Image
              </button>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Input text to add..."
              />
              <button onClick={this.handleUploadText} className="btn btn-info">
                Add Text
              </button>
            </div>
          </div>
          <form>
            <h3>Assets</h3>
            <hr />
            <div className="text">
              <h4>Text</h4>
              <div className="well">...</div>
            </div>
            <div className="image">
              <h4>Images</h4>
              <div className="well">
                <ul className="list-unstyled">
                  {/* <!-- List of images here --> */}
                  {/* <!-- <li><img src="images/sample.jpeg" class="img-rounded" /></li> --> */}
                </ul>
              </div>
            </div>
          </form>
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
