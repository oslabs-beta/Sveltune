// console.log('hello from content script!');

// chrome.runtime.sendMessage(null, 'landed on localhost!', (response) => {
//   console.log('im from the send response function: ', response);
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message);
//   console.log(sender);
// });



// Function to extract Svelte components marked with any attribute
function SvelteComponents() {
  const components = [];

  // Find all elements with any attribute
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
      // Check if the element has any attributes

      const attributes = Array.from(element.attributes);
      
      if (attributes.length > 0) {
          // Extract the inner HTML of elements with attributes
          
          const componentCode = element.innerHTML;
          console.log(componentCode, 'code')
          components.push(componentCode);
      }
  });

  return components;
}

// Extract Svelte components marked with any attribute
const svelteComponents = SvelteComponents();
console.log(svelteComponents)

// Send the extracted Svelte components to the background script
chrome.runtime.sendMessage({ type: 'svelteComponents', data: svelteComponents });



// content.js
// Content script

// console.log('Content script loaded');

// // Regular expression to match Svelte component declarations
// const componentRegex = /<script(?:[^>]+)?>([\s\S]*?)<\/script>/gs;

// // Function to extract components from Svelte code
// function extractComponentsFromSvelteCode(code) {
//     const components = [];
//     let match;
//     while ((match = componentRegex.exec(code)) !== null) {
//         const componentCode = match[1].trim();
//         components.push(componentCode);
//     }
//     return components;
// }

// // Function to fetch Svelte code from the current page
// function fetchSvelteCodeFromPage() {
//     const scripts = document.querySelectorAll('script[type="text/svelte"]');
//     const svelteCode = Array.from(scripts).map(script => script.textContent).join('\n');
//     return svelteCode;
// }

// // Extract components from the Svelte code on the page
// const svelteCode = fetchSvelteCodeFromPage();
// const components = extractComponentsFromSvelteCode(svelteCode);
// console.log('Components:', components);


// content.js

// Function to extract a specific Svelte component








