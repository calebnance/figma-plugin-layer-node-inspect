import * as React from 'react';
import PropTypes from 'prop-types';

const LineItem = ({ label, value }) => (
  <div className="line-item">
    <div>{label}</div>
    <div>{value}</div>
  </div>
);

LineItem.propTypes = {
  // required
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default React.memo(LineItem);
