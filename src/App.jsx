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
      canvasItems: [],
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadText = this.handleUploadText.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleDeleteCanvasItem = this.handleDeleteCanvasItem.bind(this);

    this.fetchData();
  }

  onDrop(e) {
    const { canvasItems } = this.state;
    const { target, currentTarget, clientX, clientY } = e;
    const id = e.dataTransfer.getData('id');
    const existentItem = this.state.canvasItems.find(item => item.image.toString() === id);

    e.preventDefault();

    if (existentItem !== undefined) {
      canvasItems.splice(canvasItems.indexOf(existentItem), 1);

      this.setState({
        canvasItems: [...canvasItems],
      });
    }

    const calculateTop = () => {
      const top = clientY - target.parentElement.offsetTop - currentTarget.offsetTop;
      return top + 65 > target.parentElement.clientHeight + target.parentElement.offsetTop
        ? target.parentElement.clientHeight - 65 - currentTarget.offsetTop
        : top;
    };

    const calculateLeft = () => {
      const left = clientX - target.parentElement.offsetLeft - currentTarget.offsetLeft;
      return left + 65 > target.parentElement.clientWidth + target.parentElement.offseLeft
        ? target.parentElement.clientWidth - 50
        : left;
    };

    const newAddedItem = {
      image: this.state.imagesList.find(item => item === id),
      coords: {
        left: calculateLeft(),
        top: calculateTop(),
      },
    };

    this.setState({
      canvasItems: [
        ...canvasItems,
        newAddedItem,
      ],
    });
  }

  onDragStart(e, id) { // eslint-disable-line class-methods-use-this
    e.dataTransfer.setData('id', id);
  }

  fetchData() {
    const { imagesList } = this.state;

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
          imagesList: [...imagesList, ...images],
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
    const { selectedFile, imagesList } = this.state;

    // Do nothing if no file selected
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    service
      .uploadImage(formData)
      .then((response) => {
        const file = getProperty(response, 'data.file');

        if (!file) {
          throw new Error('Error creating file on server!');
        }

        this.setState({
          imagesList: [...imagesList, file],
        });
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }

  handleDeleteCanvasItem(e) {
    const { canvasItems } = this.state;
    const itemToDelete = canvasItems.find(item => item.image === e.target.src);

    canvasItems.splice(canvasItems.indexOf(itemToDelete), 1);

    this.setState({
      canvasItems: [...canvasItems],
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
          <div className="assets">
            <h3>Assets</h3>
            <hr />
            <div className="text">
              <h4>Text</h4>
              <div className="well">...</div>
            </div>
            <h4>Images</h4>
            <div className="images">
              <ul className="nav nav-justified images-container">
                {/* <!-- List of images here --> */}
                {imagesList.map(item => (
                  <li className="image" key={item.toString()}>
                    <div draggable onDragStart={e => this.onDragStart(e, item.toString())} >
                      <img src={item} alt={item} className="img-rounded" />
                    </div>
                  </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- canvas --> */}
        <div className="canvas col-sm-8 col-md-8 col-lg-8">
          <div
            className="block"
            onDragOver={e => e.preventDefault()}
            onDrop={e => this.onDrop(e)}
          >
            {this.state.canvasItems.map(item => (
              <div
                className="dropped-item"
                style={item.coords}
                key={item.image}
                draggable
                onDragStart={e => this.onDragStart(e, item.image)}
                onDoubleClick={e => this.handleDeleteCanvasItem(e)}
              >
                <img src={item.image} alt={item.image} className="img-rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
