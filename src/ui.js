import * as React from 'react';
import { createRoot } from 'react-dom/client';

// scss base
import './ui.scss';

// components
import Results from './components/Results';

// function for message bridge to figma
const sendToFigma = (type, data) => {
  parent.postMessage({ pluginMessage: { type, ...data } }, '*');
};

const App = () => {
  const [selected, setSelected] = React.useState(0);
  const [node, setNode] = React.useState(null);
  const [results, setResults] = React.useState(null);

  // main listener for all messages from Figma bridge
  // https://www.figma.com/plugin-docs/how-plugins-run/
  const messageFromFigma = (event) => {
    const { data, type } = event.data.pluginMessage;

    // console.log('type', type);
    // console.log('data', data);
    // console.log('===============');

    // on selection change
    if (type === 'selected-count') {
      setSelected(data.count);

      if (data.node !== null) {
        setNode(data.node);
      }
    }

    // display results
    if (type === 'results') {
      setResults(data.results);
    }
  };

  const confirmSelected = () => {
    sendToFigma('get-node-info', { nodeId: node.id });
  };

  React.useEffect(() => {
    window.addEventListener('message', messageFromFigma);

    return () => {
      window.removeEventListener('message', messageFromFigma);
    };
  }, []);

  if (results !== null) {
    return (
      <main>
        <Results data={results} />
      </main>
    );
  }

  return (
    <main>
      {selected === 0 && (
        <div className="flex-center-fill">Please select a node</div>
      )}

      {selected > 1 && (
        <div className="flex-center-fill">Only select 1 node at a time</div>
      )}

      {selected === 1 && (
        <div className="flex-center-fill text-center">
          {node !== null && (
            <p>
              {`Selected layer: `}
              <strong>{node.name}</strong>
            </p>
          )}

          <div className="spacer-16" />

          <button className="brand" type="submit" onClick={confirmSelected}>
            View Node
          </button>
        </div>
      )}
    </main>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
