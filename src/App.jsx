import React from 'react';

import getProperty from './helpers/get-property';
import * as service from './data-service';
import './main.css';
import './bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesList: [],
      selectedFile: null,
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadText = this.handleUploadText.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);

    this.fetchData();
  }

  fetchData() {
    service
      .getImages()
      .then((response) => {
        const images = getProperty(response, 'data');

        if (!images) {
          throw new Error('Invalid response data.');
        }

        if (!Array.isArray(images)) {
          throw new TypeError('Unrecognised response data.');
        }

        this.setState({
          imagesList: [...this.state.imagesList, ...images],
        });
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }

  handleSelectFile(e) {
    this.setState({ selectedFile: e.target.files[0] });
  }

  handleUploadImage() {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile, this.state.selectedFile.name);

    service
      .uploadImage(formData)
      .then((response) => {
        const file = getProperty(response, 'data.file');

        if (!file) {
          throw new Error('Error creating file on server!');
        }

        this.setState({
          imagesList: [...this.state.imagesList, file],
        });
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }

  handleUploadText() {
    console.log('#textUpload', !!this);
  }

  render() {
    const { imagesList } = this.state;
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
                onChange={this.handleSelectFile}
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
              <ul className="nav nav-justified">
                {/* <!-- List of images here --> */}
                {imagesList.map(item => (
                  <li>
                    <img src={item} alt={item} className="img-rounded" />
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
        {/* <!-- canvas --> */}
        <div className="canvas col-sm-8 col-md-8 col-lg-8">
          <div className="block">
            {/* <!-- Add images and texts to here --> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
