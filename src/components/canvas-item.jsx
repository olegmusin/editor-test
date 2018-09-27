import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const CanvasItem = (props) => {
  const { item, onDragStart, onDoubleClick } = props;
  return (
    <div
      className="dropped-item"
      style={item.coords}
      draggable
      onDragStart={onDragStart}
      onDoubleClick={onDoubleClick}
      {...props}
    >
      <img src={item.image} alt={item.image} className="img-rounded" />
    </div>
  );
};

CanvasItem.defaultProps = {
  onDoubleClick: () => undefined,
};

CanvasItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    id: PropTypes.string,
    coords: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
    action: PropTypes.string,
  }).isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func,
};

export default CanvasItem;
