// https://www.figma.com/plugin-docs/api/properties/figma-showui/
figma.showUI(__html__, { height: 400, width: 380, themeColors: true });

console.clear();

let listenForSelection = true;

figma.on('run', () => {
  console.log('plugin started');
});

// listener on selection change
// https://www.figma.com/plugin-docs/api/properties/figma-on/
figma.on('selectionchange', () => {
  // only listen when nothing has been confirmed
  if (listenForSelection === true) {
    figma.ui.postMessage({
      type: 'selected-count',
      data: { count: figma.currentPage.selection.length }
    });
  }
});

// main listener on Figma scene side
// https://www.figma.com/plugin-docs/api/figma-ui/#onmessage
figma.ui.onmessage = async (msg) => {
  const { type } = msg;

  // get selected count
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'get-selected-count') {
    // respond to UI layer
    // https://www.figma.com/plugin-docs/api/figma-ui/#postmessage
    figma.ui.postMessage({
      type: 'selected-count',
      data: { count: figma.currentPage.selection.length }
    });
  }

  // get node info
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'get-node-info') {
    listenForSelection = false;
    console.log('msg', msg);
  }
};
