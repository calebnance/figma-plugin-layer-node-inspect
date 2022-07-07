import * as React from 'react';
import PropTypes from 'prop-types';

// components
import LineItem from './LineItem';

const Results = ({ data }) => {
  console.log(data);
  const keysArray = Object.keys(data);

  return (
    <div className="results">
      <div className="list">
        {keysArray.map((key) => {
          const value = data[key];

          if (key === 'mainComponent') {
            console.log('value', value);
            return null;
          }

          return <LineItem key={key} label={key} value={`${value}`} />;
        })}
      </div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

Results.propTypes = {
  // required
  data: PropTypes.object.isRequired
};

export default React.memo(Results);
