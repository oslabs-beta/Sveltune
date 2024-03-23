<script lang="ts">
  import SplitpaneContainer from '../lib/components/SplitpaneContainer.svelte';
  import { onMount } from 'svelte';
  import {
    // custom_rootData_Editor,
    RootComponentStore,
    SvelteVersionStore,
  } from '../stores/Store.js';
  import items from '../lib/containers/TabAdder.svelte';

  let rootComponent: any;
  let svelteVersion: any;

  RootComponentStore.subscribe((data) => {
    rootComponent = data;
  });

  // custom_rootData_Editor.subcribe_rootData_Editor((data: any) => {
  //   rootComponent = data;
  // });

  SvelteVersionStore.subscribe((data) => {
    if (data) {
      console.log('svelte version from layout: ', data);
      svelteVersion = data;
    }
    // console.log('svelte version from layout: ', data);
    // svelteVersion = data;
  });

  // Function to set up the panel
  async function setUpPanel() {
    console.log('setUpPanel hit', Date.now());
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (tab && tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, { message: 'getRootComponent' });
        chrome.tabs.sendMessage(tab.id, { message: 'getSvelteVersion' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Message listener function
  function messageListener(message: any) {
    if (message.type === 'returnSvelteVersion') {
      console.log('returnSvelteVersion message receieved', Date.now(), message);
      svelteVersion = message.svelteVersion;
      SvelteVersionStore.update((currentData) => {
        return svelteVersion;
      });
    }

    if (message.type === 'updateRootComponent') {
      console.log('updateRootComponent message receieved', Date.now(), message);
      rootComponent = message.rootComponent;

      if (rootComponent) {
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
      }
    } else if (message.type === 'returnRootComponent') {
      // console.log('returnRootComponent message receieved', Date.now(), message);
      // rootComponent = message.rootComponent;

      if (rootComponent) {
        console.log(
          'returnRootComponent message receieved',
          Date.now().toLocaleString(),
          message
        );
        rootComponent = message.rootComponent;
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
      }
    } else if (message.type === 'returnTempRoot') {
      console.log(
        'returnTempRoot message receieved',
        Date.now().toLocaleString(),
        message
      );
      const tempRoot = message.rootComponent;
    } else if (message.type === 'handleBrowserRefresh') {
      console.log(
        'handleBrowserRefresh message receieved',
        Date.now(),
        message
      );

      RootComponentStore.update((currentData) => {
        return {};
      });

      SvelteVersionStore.update((currentData) => {
        return '...';
      });

      chrome.runtime.sendMessage({
        type: 'getRootComponent',
        source: 'layout.svelte',
      });

      setUpPanel();
    }
  }

  // Set up message listener and panel on mount
  onMount(() => {
    chrome.runtime.onMessage.addListener(messageListener);
    setUpPanel();
  });
</script>

<main>
  <SplitpaneContainer />
</main>
