<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import RootComponentStore from '../../stores/Store';
  // import { tree } from 'd3';
  // import { stringify } from 'querystring';
  // import Popup from '../../../static/Popup/Popup.svelte';

  const tree: any = d3.tree;

  interface TreeData {
    tagName: string;
    children: TreeData[];
  }

  let treeData: TreeData;

  RootComponentStore.subscribe((data) => {
    // console.log('logging current data from Store from Tree component: ', data);
    treeData = data;

    if (treeData) {
      const updatedTreeData: TreeData = objDiver(treeData);
      console.log('logging updated tree data: ', updatedTreeData);
      treeData = updatedTreeData;
    }
  });

  /**
   * Dynamically traverse through incoming Svelte data to render the Tree
   * @param data
   */
  function objDiver(data: any): TreeData {
    if (typeof data === 'object') {
      const componentData: TreeData = {
        tagName: data.tagName, // Handle missing tagName
        children: [],
      };
      if (data.children) {
        componentData.children = data.children.map(objDiver);
      }
      return componentData;
    }
  }

  // let testTreeData = {
  //   rootComponent: {
  //     tagName: 'App',
  //     children: [
  //       {
  //         tagName: 'ContactCard',
  //         children: [
  //           {
  //             tagName: 'Hello',
  //             children: [
  //               {
  //                 tagName: 'world',
  //                 children: [],
  //               },
  //             ],
  //           },
  //           {
  //             tagName: 'Goodbye',
  //             children: [],
  //           },
  //           {
  //             tagName: 'LOL',
  //             children: [],
  //           },
  //           {
  //             tagName: 'Love',
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         tagName: 'James',
  //         children: [
  //           {
  //             tagName: 'Lee',
  //             children: [],
  //           },
  //           {
  //             tagName: 'is',
  //             children: [],
  //           },
  //           {
  //             tagName: 'awesome',
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         tagName: 'Jeff',
  //         children: [
  //           {
  //             tagName: 'was',
  //             children: [],
  //           },
  //           {
  //             tagName: 'Amazing',
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         tagName: 'Branden',
  //         children: [
  //           {
  //             tagName: 'can',
  //             children: [],
  //           },
  //           {
  //             tagName: 'handstand',
  //             children: [],
  //           },
  //           {
  //             tagName: 'really',
  //             children: [],
  //           },
  //           {
  //             tagName: 'well',
  //             children: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // };
  
  let root;


  // function onChange(...args: any) {
  //   console.log('on change hit');
  //   root = d3.hierarchy(objDiver(args));
  //   return root;
  // }

  //handle click everytime u click on the text of the node
  function handleClick() {
    console.log('hello world!');
  }

  let isDragging = false;
  onMount(() => {
     all components of the tree in in index 0
    let root = d3.hierarchy(treeData.rootComponent);
    let root = d3.hierarchy(treeData);
    root = d3.hierarchy(treeData);

    //giving each node space for each node

    let treeLayout = d3.tree().nodeSize([110, 120]);

    // creating the tree Layout
    treeLayout(root);

  //   // Select SVG Container
  //   let svg = d3.select('#demo1');

  //   //appending everything to g(a group element) serves as container for other SVG elements
  //   let treeGroup = svg.append('g');

  //   // These are how the linkes are created
  //   treeGroup
  //     .selectAll('.link')

  //     .data(root.links())
  //     .enter()
  //     .append('path')
  //     .attr('class', 'link')
  //     //placing each link in a specific position
  //     .attr(
  //       'd',
  //       d3
  //         .linkVertical()
  //         .x((/** @type {{ x: any; }} */ d) => d.x)
  //         .y((/** @type {{ y: any; }} */ d) => d.y)
  //     );

  //   // This is how nodes are created
  //   let hello = root.descendants();

  //   let nodes = treeGroup
  //     .selectAll('.node')
  //     .data(root.descendants())
  //     .enter()
  //     .append('g')
  //     .attr('class', 'node')
  //     //position of each node
  //     .attr(
  //       'transform',
  //       (/** @type {{ x: any; y: any; }} */ node) =>
  //         `translate(${node.x},${node.y})`
  //     );

  //   //creating a rectangle shape for each node
  //   nodes
  //     .append('rect')
  //     .attr('x', -50)
  //     .attr('y', 5)
  //     .attr('width', 100)
  //     .attr('height', 20)
  //     .attr('stroke', 'black')
  //     .attr('fill', 'yellow');

  //   //handle click everytime u click on the text of the node
  //   function handleClick() {
  //     console.log('hello world!');
  //   }

  //   //  adding text to node
  //   nodes
  //     .append('text')
  //     .attr('text-anchor', 'middle')
  //     .attr('dy', '15')

  //     .text(
  //       (/** @type {{ data: { tagName: any; }; }} */ node) => node.data.tagName
  //     )
  //     .on('click', handleClick);
  //   // sets fill attr of selected SVG to none removes any fill color from path making it transparent. stroke is the outline of the path which is black
  //   svg.selectAll('.link').attr('fill', 'none').attr('stroke', 'black');
  //   //changing font size of text
  //   svg.selectAll('.node text').attr('font-size', '10px');
  //   //allowing you to drag the whole component tree based on mouse movement
  //   svg.call(
  //     d3.drag().on('drag', (/** @type {{ x: any; y: any; }} */ event) => {
  //       svg.attr('transform', `translate(${event.x},${event.y})`);
  //       // event.preventDefault();
  //     })
  //   );

  //   //making sure it will always fix the whole tree
  //   let maxX = -Infinity;

  //   root.each((node) => {
  //     if (Math.abs(node.x) > maxX) maxX = Math.abs(node.x);
  //   });

  //   // Set the SVG width to accommodate the entire tree
  //   svg.attr('width', maxX + 5000);

  //   let maxY = -Infinity;
  //   root.each((node) => {
  //     if (node.y > maxY) {
  //       maxY = node.y;
  //     }
  //   });

  //   svg.attr('height', maxY + 500);
  //   // positioning the width and height of the treegroup
  //   const xOffset = svg.attr('width') / 2;
  //   const yOffset = 300;
  //   treeGroup.attr('transform', `translate(${xOffset},${yOffset})`);
  // });

</script>

<svg on:change={() => objDiver(treeData)} id="demo1"></svg>

<style>
</style>
