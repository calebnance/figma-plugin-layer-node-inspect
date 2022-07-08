import * as React from 'react';
import PropTypes from 'prop-types';

// components
import ComponentProperties from './ComponentProperties';
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
                <h2>Main Component</h2>

                {keysMainArray.map((keyMain) => {
                  const valueMain = value[keyMain];

                  if (keyMain === 'componentPropertyDefinitions') {
                    return (
                      <ComponentProperties key={keyMain} data={valueMain} />
                    );
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

      <h2>JSON</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

Results.propTypes = {
  // required
  data: PropTypes.object.isRequired
};

export default React.memo(Results);
