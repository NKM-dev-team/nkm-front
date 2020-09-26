import React from 'react';
import PropTypes from 'prop-types';
import HexUtils from './HexUtils';
import Point from './models/Point';

const Pattern = props => {
  const { id, link, size } = props;

  return (
    <defs>
      <pattern id={id} patternUnits="objectBoundingBox" x={0} y={0} width={size.x} height={size.y}>
        <image xlinkHref={link} x={0} y={0} width={size.x*2} height={size.y*2} />
      </pattern>
    </defs>
  );
};

Pattern.propTypes = {
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  size: PropTypes.object
};

Pattern.defaultProps = {
  size: new Point(10, 10)
};

export default Pattern;
