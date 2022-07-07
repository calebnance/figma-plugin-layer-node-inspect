import * as React from 'react';
import PropTypes from 'prop-types';

// components
import LineItem from './LineItem';

const Results = ({ data }) => {
  const keysArray = Object.keys(data);

  return (
    <div className="results">
      <div className="list">
        {keysArray.map((key) => {
          const value = data[key];

          if (key === 'mainComponent') {
            const keysMainArray = Object.keys(value);

            return (
              <React.Fragment key={key}>
                <h3>Main Component</h3>

                {keysMainArray.map((keyMain) => {
                  const valueMain = value[keyMain];

                  if (keyMain === 'componentPropertyDefinitions') {
                    return null;
                  }

                  return (
                    <LineItem
                      key={keyMain}
                      label={keyMain}
                      value={`${valueMain}`}
                    />
                  );
                })}
              </React.Fragment>
            );
          }

          return <LineItem key={key} label={key} value={`${value}`} />;
        })}
      </div>

      <h3>JSON</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

Results.propTypes = {
  // required
  data: PropTypes.object.isRequired
};

export default React.memo(Results);
