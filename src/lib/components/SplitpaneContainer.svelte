<script lang="ts">
  import { Splitpanes, Pane } from 'svelte-splitpanes';
  // import SnapShot from './SnapShot.svelte';
  import Tree from './Tree.svelte';
  import Tabs from '../containers/Tabs.svelte';
  import { SvelteVersionStore } from '../../stores/Store.js';

  let svelteVersion: number;

  SvelteVersionStore.subscribe((data) => {
    if (data) {
      svelteVersion = data;
      console.log('logging svelte version from splitpane container: ', data);
    }
    // console.log('svelte version from splitpane container: ', data);
    // svelteVersion = data;
  });
</script>

<Splitpanes style="height: 100%">
  <Pane minSize={20}>
    <div class="panel">
      <p class="svelte-version">
        Svelte Version: <strong>{svelteVersion}</strong>
      </p>
      <Tree />
    </div>
  </Pane>

  <Pane minSize={20}>
    <div class="tabsPanel">
      <Tabs />
    </div>
  </Pane>
</Splitpanes>

<style>
  .svelte-version {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 10px;
    font-style: italic;
    color: gray;
  }

  .panel {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    align-items: flex-start;
    justify-content: center;
    text-align: left;
  }

  .tabsPanel {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: black;
  }
</style>
