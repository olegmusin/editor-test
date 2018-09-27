import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const ImageItem = (props) => {
  const { item, onDragStart } = props;
  return (
    <li className="image" {...props} >
      <div draggable onDragStart={onDragStart} >
        <img src={item} alt={item} className="img-rounded" />
      </div>
    </li>
  );
};

ImageItem.propTypes = {
  item: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default ImageItem;
