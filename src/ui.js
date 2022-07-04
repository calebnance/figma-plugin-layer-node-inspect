import * as React from 'react';
import { createRoot } from 'react-dom/client';

// scss base
import './ui.scss';

// function for message bridge to figma
const sendToFigma = (type, data) => {
  parent.postMessage({ pluginMessage: { type, ...data } }, '*');
};

const App = () => {
  const [selected, setSelected] = React.useState(0);
  const [results, setResults] = React.useState(null);

  // main listener for all messages from Figma bridge
  // https://www.figma.com/plugin-docs/how-plugins-run/
  const messageFromFigma = (event) => {
    const { data, type } = event.data.pluginMessage;
    console.log('got message');

    // on selection change
    if (type === 'selected-count') {
      setSelected(data.count);
    }
    console.log('type', type);
    console.log('data', data);
    console.log('===============');
  };

  React.useEffect(() => {
    window.addEventListener('message', messageFromFigma);

    return () => {
      window.removeEventListener('message', messageFromFigma);
    };
  }, []);

  return (
    <main>
      {selected === 0 && (
        <React.Fragment>
          <div className="flex-center-fill">please select a node</div>
          <div className="spacer-16" />
          <button className="brand" type="submit">
            Confirm
          </button>
        </React.Fragment>
      )}

      {selected > 1 && <div>only select 1 node at a time</div>}

      {selected === 1 && <div>has selected 1</div>}
    </main>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
