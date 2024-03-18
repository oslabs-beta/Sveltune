<script >
    import SingleTab from "./SingleTab.svelte";
          /**
     * @type {any}
     */
    export let items = {};
    export let activeTabValue = 1;
    let index = 2;
      
    const handleClick = (/** @type {number} */ tabValue) => () => (activeTabValue = tabValue);
      
      
    const addTab = (/** @type {number} */ tabValue) => () => {
      const tab = `Editor${index}`
      items[tab] = {
         value: index,
         component: SingleTab,
      }
      activeTabValue = index;
      items = items;
      index++;
    };

    
    const removeTab = (/** @type {string} */ tabValue) => () => {
        delete items[tabValue];
        items = items;
    };



    for (node of tree) {
      
    }
  </script>
  
  
  
  <ul>
      {#each Object.entries(items) as [key, value]}
          <li class={activeTabValue === value.value ? 'active' : ''}>
              <span on:click={handleClick(value.value)} >{key}</span>
          </li>
      {/each}
      <span class="button" on:click={addTab()}>+</span>
  </ul>
  
  {#each Object.entries(items) as [key, value]}
    {#if activeTabValue == value.value}
    <div class="box">
      <button id ="delete" on:click={removeTab(key)}>Delete Tab</button>
      <svelte:component this={value.component}/>
    </div>
    {/if}
  {/each}
  
  
  
  <style>
    .box {
      padding: 40px;
      border: solid white;
      border-radius: 0 0 .5rem .5rem;
      border-top: 5px;
      overflow: scroll;
    }
    
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      border-bottom: 1px solid #dee2e6;
    }
    
    li {
      margin-bottom: -1px;
    }
  
    span {
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      display: block;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: 0.7s;
    }
  
    span:hover {
      border-color: #e9ecef #e9ecef #dee2e6;
      background-color: orangered;
      color : black;
    }

    .button {
        background-color: black;
        color: white;
    }

    #delete {
      background-color: black;
        color: white;
        transition: 0.45s;
    }
    
    #delete:hover{
      background-color: orangered;
      color : black;
    }
    
    li.active > span {
      color: #495057;
      background-color: orange;
      border-color: #dee2e6 #dee2e6 #fff;
    }
  </style>