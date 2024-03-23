/*
  This is the ISOLATED content script! This can communicate with our MAIN content
  script. It can also communicate with the Popup and Panel. So it's kind of like
  the middle man of this Chrome extension
*/
console.log('Hello from contentScriptIsolate');
let port = null;  
// Listens to messages from ContentScriptMain
// and forwards them to other parts of the extension
window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'contentScript.js'
  ) {
    // console.log('msg not qualified from contentScriptIsolate msg:', msg)
    return;
  }

  console.log('Checking returnRootComponent');

  switch (msg.data.type) {
    case 'updateRootComponent':
    case 'returnRootComponent':
    case 'returnTempRoot':
      console.log(
        'window.addEventListener from contentScriptIsolate, msg: ',
        msg
      );

      chrome.runtime.sendMessage({
        type: msg.data.type,
        rootComponent: msg.data.rootComponent,
      });
      break;
    case 'returnSvelteVersion':
      chrome.runtime.sendMessage({
        type: msg.data.type,
        svelteVersion: msg.data.svelteVersion,
      });
      break;
    case 'handleBrowserRefresh':
      console.log(
        'handleBrowserRefresh message recieved in contentScriptIsolate: ',
        Date.now()
      );
      chrome.runtime.sendMessage({
        type: msg.data.type,
      });
      break;
    default:
      break;
  }
});

// Listens for a message from the Popup and Panel
// Forwards them to ContentScriptMain/index.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('getRootComponent from contentScriptIsolate');

  switch (request.message) {
    case 'getRootComponent':
    case 'getSvelteVersion':
    case 'handleClosedPanel':
      console.log('getRootComponent from contentScriptIsolate');

      window.postMessage({
        // target: node.parent ? node.parent.id : null,
        type: request.message,
        source: 'contentScriptIsolate.js',
      });

      break;

    case 'injectState':
      window.postMessage({
        // target: node.parent ? node.parent.id : null,
        type: request.message,
        newState: request.newState,
        componentId: request.componentId,
        source: 'contentScriptIsolate.js',
      });
      break;

    case 'injectSnapshot':
      window.postMessage({
        type: request.message,
        snapshot: request.snapshot,
        source: 'contentScriptIsolate.js',
      });
      break;

    case 'handleBrowserRefresh':
      window.postMessage({
        type: request.message,
        source: 'contentScriptIsolate.js',
      });
      break;
  }
});

// NOTE: If you're trying to send a message to a listener in a different
// part of the extension that hasn't been loaded yet, you'll get an error
// like "Unchecked runtime.lastError: Could not establish connection.
// Receiving end does not exist." This happened to Alex when he was
// trying to send a message to a listener inside the Panel component.
// The Panel component hadn't been rendered yet, so no listener had been added.
// Don't be like Alex
