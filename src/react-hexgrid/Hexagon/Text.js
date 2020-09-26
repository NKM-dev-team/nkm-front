import React from 'react';
import PropTypes from 'prop-types';

const Text = props => {
  const { children, x, y, className } = props;
  return (
    <text x={x || 0} y={y ? y : '0.3em'} className={className} textAnchor="middle">{children}</text>
  );
};

Text.propTypes = {
  children: PropTypes.string,
  x: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  y: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string
};

export default Text;
