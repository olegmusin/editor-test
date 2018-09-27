import React from 'react';
import uuidv4 from 'uuid';

import getProperty from '../helpers/get-property';
import * as service from '../services/data-service';

import CanvasItem from './canvas-item';
import ImageItem from './image-item';

import './main.css';
import './bootstrap.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesList: [],
      canvasItems: [],
      selectedFile: null,
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadText = this.handleUploadText.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleDeleteCanvasItem = this.handleDeleteCanvasItem.bind(this);

    this.fetchData();
  }

  // ----------------------------------------
  // Event hanlers
  //-----------------------------------------

  onDrop(e) {
    const { canvasItems, imagesList } = this.state;
    const { target, currentTarget, clientX, clientY } = e;

    const id = e.dataTransfer.getData('id');
    const action = e.dataTransfer.getData('action');
    const image = e.dataTransfer.getData('image');

    const existentItem = canvasItems.find(item => item.id === id);

    e.preventDefault();

    // The idea of move is to remove and add again element
    // with updated coords to canvas
    if (action === 'move') {
      canvasItems.splice(canvasItems.indexOf(existentItem), 1);

      this.setState({
        canvasItems: [...canvasItems],
      });
    }

    /**
    * Function calculates top coordinate of item in canvas
    *
    * @returns {Number} top coordinate of item
    */
    const calculateTop = () => {
      const elementHeight = 65;
      const { parentElement } = target;
      const top = clientY - parentElement.offsetTop - currentTarget.offsetTop;

      return top + elementHeight > parentElement.clientHeight + parentElement.offsetTop
        ? parentElement.clientHeight - currentTarget.offsetTop - elementHeight
        : top;
    };

    /**
    * Function calculates left coordinate of item in canvas
    *
    * @returns {Number} Left coordinate of item
    */
    const calculateLeft = () => {
      const elementWidth = 65;
      const { parentElement } = target;
      const left = clientX - parentElement.offsetLeft - currentTarget.offsetLeft;

      return left + elementWidth > parentElement.clientWidth + parentElement.offsetLeft
        ? parentElement.clientWidth - currentTarget.offsetLeft - elementWidth
        : left;
    };

    const newCanvasItem = {
      id: uuidv4(),
      image: imagesList.find(item => item === image),
      coords: {
        left: calculateLeft(),
        top: calculateTop(),
      },
    };

    this.setState({
      canvasItems: [...canvasItems, newCanvasItem],
    });
  }

  onDragStart(e, id, image) { // eslint-disable-line class-methods-use-this
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('image', image);

    if (e.target.parentNode.className === 'dropped-item') {
      e.dataTransfer.setData('action', 'move');
      return;
    }

    e.dataTransfer.setData('action', 'add');
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

  handleDeleteCanvasItem(id) {
    const { canvasItems } = this.state;
    const itemToDelete = canvasItems.find(item => item.id === id);

    canvasItems.splice(canvasItems.indexOf(itemToDelete), 1);

    this.setState({
      canvasItems: [...canvasItems],
    });
  }

  // TODO: create logic for text elements
  handleUploadText() {
    console.log('#textUpload', !!this);
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

  render() {
    const { imagesList, canvasItems } = this.state;
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
            <span>Note: To <b>delete</b> item from canvas, simply double-click on it</span>
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
                {imagesList.map((item) => {
                  const id = uuidv4();
                  return (
                    <ImageItem
                      key={id}
                      item={item}
                      onDragStart={e => this.onDragStart(e, id, item)}
                    />
                  );
                })}
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
            {canvasItems.map(item => (
              <CanvasItem
                key={item.id}
                item={item}
                onDragStart={e => this.onDragStart(e, item.id, item.image)}
                onDoubleClick={() => this.handleDeleteCanvasItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
