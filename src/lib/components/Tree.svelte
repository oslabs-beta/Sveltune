<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import {
    RootComponentStore,
    SelectedNodeAttributes,
  } from '../../stores/Store';

  interface TreeData {
    tagName: string;
    children: TreeData[];
  }

  let root;
  let treeData: any = null;
  let svg : any;
  let treeContainer;
  let selectedNode;

  RootComponentStore.subscribe((data) => {
    treeData = data;

    if (treeData) {
      const updatedTreeData: TreeData = objDiver(treeData);
      updateTree();
    }
  });

  SelectedNodeAttributes.subscribe((data) => {
    // console.log('subscribed to selected node attributes: ', data);
    selectedNode = data;
  });

  console.log('selected node line 34: ', selectedNode);

  function objDiver(data: any): TreeData {
    if (typeof data === 'object') {
      const componentData: TreeData = {
        tagName: data.tagName, // Handle missing tagName
        children: [],
      };
      if (data.children) {
        for (let i = 0; i < data.children.length; i++) {
          componentData.children.push(objDiver(data.children[i]));
        }
      }
      return componentData;
    }
  }
  function handleMouseOver() {
    d3.select(this)
      .select('rect')
      .transition()
      .delay(10)
      .attr('stroke', 'black')
      .attr('stroke-width', '2px');
    // .attr('fill', 'orangered');
  }

  function handleMouseOut() {
    d3.select(this)
      .select('rect')
      .transition()
      .delay(10)
      .attr('stroke', 'none');
    // .attr('fill', 'orange');
  }

  // Function to update the tree
  function updateTree() {
    if (!treeData) return;
    d3.selectAll('svg > *').remove();
    treeContainer = d3.select('#treeContainer');
    // const treeContainer = d3.select('#tree-container');
    root = d3.hierarchy(treeData);

    svg = d3
      .select('#treeComponent')
      .append('g')
      .attr('transform', 'translate(width / 2 + height / 2)');

    const treeLayout = d3.tree().nodeSize([110, 120]);
    treeLayout(root);

    const treeGroup = svg.append('g').attr('transform', 'translate(20,20)');

    // Draw links
    treeGroup
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr(
        'd',
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      );

    // Draw nodes and add click functionality
    const nodes = treeGroup
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('style', 'cursor: pointer;')
      .attr('transform', (node) => `translate(${node.x},${node.y})`)
      .on('click', handleNodeClick);

    // Append rectangle for nodes
    nodes
      .append('rect')
      .attr('x', -50)
      .attr('y', 5)
      .attr('width', 100)
      .attr('height', 30)
      // .attr('stroke', '2px solid black')
      .attr('fill', 'orange')
      .attr('rx', '7px')
      .attr('ry', '7px')
      .attr(
        'style',
        'display: flex; align-items: center; justify-content: center; shape-rendering: geometricPrecision;'
      );

    // Append text for nodes
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '24')
      .text((d) => d.data.tagName);

    nodes.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut);

    svg.selectAll('.link').attr('fill', 'none').attr('stroke', 'black');
    //changing font size of text
    svg
      .selectAll('.node text')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('style', `font-family: 'system-ui';`);
  }

  function dragstarted(event, d) {
    d3.select(this).raise().classed('active', true);
  }

  function dragged(event, d) {
    d3.select(this).attr(
      'transform',
      'translate(' + event.x + ', ' + event.y + ')'
    );
  }

  function dragended(event, d) {
    d3.select(this).classed('active', false);
  }

  function handleNodeClick(event, d) {
    // Access data associated with the clicked node
    const clickedNodeData = d.data;
    SelectedNodeAttributes.update((data: any) => {
      return clickedNodeData;
    });
  }


  onMount(() => {
    treeContainer = d3.select('#treeContainer');
    updateTree();

    svg = d3.select('#treeComponent');

    const drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    svg.call(drag);
 
  });
</script>

<div class="tree-container" id="treeContainer">
  <svg bind:this={svg} height={'100%'} id="treeComponent"> </svg>
</div>

<style>
  .tree-container {
    overflow: visible;
    display: flex;
    position: sticky;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    cursor: grab;
  }

  #treeComponent {
    overflow: visible;
  }

  .tree-container:active {
    cursor: grabbing;
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>
