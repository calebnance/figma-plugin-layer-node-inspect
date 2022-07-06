// https://www.figma.com/plugin-docs/api/properties/figma-showui/
figma.showUI(__html__, { height: 480, width: 380, themeColors: true });

let listenForSelection = true;

// deselect all on open
figma.currentPage.selection = [];

figma.once('run', () => {
  console.clear();
  console.log('plugin started');
});

// listener on selection change
// https://www.figma.com/plugin-docs/api/properties/figma-on/
figma.on('selectionchange', () => {
  // only listen when nothing has been confirmed
  if (listenForSelection === true) {
    const selected = figma.currentPage.selection;
    console.log('selected', selected);
    let node = null;

    if (selected.length === 1) {
      node = {
        id: selected[0].id,
        name: selected[0].name
      };
    }

    // respond to UI layer
    // https://www.figma.com/plugin-docs/api/figma-ui/#postmessage
    figma.ui.postMessage({
      type: 'selected-count',
      data: { count: selected.length, node }
    });
  }
});

// main listener on Figma scene side
// https://www.figma.com/plugin-docs/api/figma-ui/#onmessage
figma.ui.onmessage = async (msg) => {
  const { type } = msg;

  // get node info
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'get-node-info') {
    const { nodeId } = msg;
    listenForSelection = false;

    // get node
    const node = figma.getNodeById(nodeId);

    // make sure node is there
    if (node === null) {
      figma.notify('Node could not be found', { error: true });
    } else {
      console.log('node', node);

      let mainComponent;
      // is instance/library component?
      if (node?.mainComponent) {
        const { key, name } = node.mainComponent;
        const { componentPropertyDefinitions } = node.mainComponent.parent;

        mainComponent = {
          key,
          name,
          componentPropertyDefinitions
        };
      }

      const results = {
        id: node.id,
        locked: node.locked,
        type: node.type,
        visible: node.visible,
        mainComponent
        // ...(node?.mainComponent && { mainComponent: node.mainComponent })
      };

      console.log('results', results);
      console.log('================================');

      figma.ui.postMessage({
        type: 'results',
        data: {
          results
        }
      });
    }
  }
};
