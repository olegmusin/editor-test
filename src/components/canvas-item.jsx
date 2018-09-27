import React from 'react';
import PropTypes from 'prop-types';

import './main.css';


const CanvasItem = (props) => {
  const { item, onDragStart, onDoubleClick } = props;
  return (
    <div
      className="dropped-item"
      style={item.coords}
      key={item.image}
      draggable
      onDragStart={onDragStart}
      onDoubleClick={onDoubleClick}
    >
      <img src={item.image} alt={item.image} className="img-rounded" />
    </div>
  );
};

CanvasItem.defaultProps = {
  onDoubleClick: () => undefined,
};

CanvasItem.propTypes = {
  item: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func,
};

export default CanvasItem;
