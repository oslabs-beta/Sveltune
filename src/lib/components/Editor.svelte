<script lang="ts">
  import { onMount } from 'svelte';
  import { SelectedNodeAttributes } from '../../stores/Store';
  import Props from './Editor/Props.svelte';
  //-----------------------------------------------------------------------------------
  let currentData: any;
  let currentComponent: any;
  export let id: number;
  export let readonly = false;
  const errors: Record<string, string | undefined> = {};

  function change(key: string, value: any) {
    chrome.devtools.inspectedWindow.eval(
      `__svelte_devtools_inject_state(${id}, '${key}', ${value})`,
      (_, error) => {
        errors[key] =
          error && error.isException
            ? error.value.substring(0, error.value.indexOf('\n'))
            : undefined;
      }
    );
  }

  SelectedNodeAttributes.subscribe((data: any) => {
    currentData = data;
    currentComponent = data.tagName;
    id = data.id;
    console.log('editor data: ', currentData);
    console.log('editor id: ', id);
  });

  onMount(() => {
    // default currentData to root component stores topmost tagName property
    // const unsubscribe = SelectedNodeAttributes.subscribe((data: any) => {
    //   currentData = data;
    //   console.log('Data from SelectedNodeAttributes: ', currentData);
    //   id = currentData.id;
    // });
    // return unsubscribe;
  });
</script>

<main>
  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->

  {#if currentData && currentData.type === 'component'}
    <h1>{currentComponent} Component</h1>
    <h2>Props - currentData.detail.attributes</h2>
    <Props id={currentData.id} currentProps={currentData.detail.attributes} />
    <hr />

    <h2>Events</h2>
    <hr />

    <h2>State - currentData.detail.ctx</h2>
    <Props id={currentData.id} currentProps={currentData.detail.ctx} />

    <!-- //TYPE: BLOCK AND ITERATION----------------------------------------------------------- -->
  {:else if (currentData && currentData.type === 'block') || (currentData && currentData.type === 'iteration')}
    <h2>State</h2>
    <Props
      readonly
      id={currentData.id}
      currentProps={currentData.detail.attributes}
    />

    <!-- //TYPE: ELEMENT----------------------------------------------------------- -->
  {:else if currentData && currentData.type === 'element'}
    <h2>Attributes</h2>
    <Props
      readonly
      id={currentData.id}
      currentProps={currentData.detail.attributes}
    />

    <h2>Events</h2>
    <!-- <Props id={currentData.id} currentProps={events} /> -->
  {/if}
</main>

<style>
  h1 {
    font-size: 24px;
    color: orangered;
    margin: 0px;
    padding: 20px 10px;

    border-radius: 0.5rem;

    letter-spacing: 1px;
  }
</style>
