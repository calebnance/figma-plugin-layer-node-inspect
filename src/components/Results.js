import * as React from 'react';
import PropTypes from 'prop-types';

const Results = ({ data }) => (
  <div className="results">
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

Results.propTypes = {
  // required
  data: PropTypes.object.isRequired
};

export default React.memo(Results);
