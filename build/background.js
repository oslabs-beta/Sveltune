// empty for now, this is the bridge between the browser and our dev tools application
// console.log('background.js is running');

// chrome.runtime.onInstalled.addListener((details) => {
//   console.log('details: ', details);
// });

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg, sender, sendResponse);
//   sendResponse('im from the background script');
//   chrome.tabs.sendMessage(sender.tab.id, 'got your message from background!');
// });

// chrome.runtime.onMessage.addListener('readScripts', (details) => {
//   console.log('logging details from readScript message: ', details);
// });

console.log('hi');

console.log('background script running');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'readScripts') {
    console.log('logging details from readScript message: ', message);
    // You can send response if needed
    sendResponse('Message received in background script');
  }
});

console.log('Background script loaded');

// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'svelteComponents') {
//     // Receive the extracted Svelte components from the content script
//     const svelteComponents = message.data;
//     console.log('Received Svelte components:', svelteComponents);

//     // You can perform further processing or send the components to a server, etc.
//   }
// });

console.log('Background script loaded');


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'svelteComponents') {
        // Receive the extracted Svelte components from the content script
        const svelteComponents = message.data;
        console.log('Received Svelte components:', svelteComponents);
        

    }
});



