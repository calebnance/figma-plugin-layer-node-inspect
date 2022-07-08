import * as React from 'react';
import PropTypes from 'prop-types';

const ComponentProperties = ({ data }) => {
  const componentPropsArray = Object.keys(data);

  return (
    <React.Fragment>
      <h3>Component Properties</h3>
      {componentPropsArray.map((compkey) => {
        const { defaultValue, type } = data[compkey];
        const [name] = compkey.split('#');

        return (
          <div key={compkey} className="line-item">
            <div>
              <div>{`Name: ${name}`}</div>
              <div>{`Type: ${type}`}</div>
            </div>
            <div>{`Default value: ${defaultValue}`}</div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

ComponentProperties.propTypes = {
  // required
  data: PropTypes.object.isRequired
};

export default React.memo(ComponentProperties);
