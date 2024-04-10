//Question 1

class Edge {
  constructor(source, destination, weight) {
    this.source = source;
    this.destination = destination;
    this.weight = weight;
  }
}

function primsAlgorithm(edges, numVertices) {
  const visited = new Array(numVertices).fill(false);
  const key = new Array(numVertices).fill(Infinity);
  const parent = new Array(numVertices).fill(null);


  key[0] = 0;

  for (let count = 0; count < numVertices - 1; count++) {
    let minKey = Infinity;
    let minIndex = -1;

    for (let v = 0; v < numVertices; v++) {
      if (!visited[v] && key[v] < minKey) {
        minKey = key[v];
        minIndex = v;
      }
    }

    visited[minIndex] = true;

    for (let i = 0; i < edges.length; i++) {
      const { source, destination, weight } = edges[i];

      if (
        source === minIndex &&
        !visited[destination] &&
        weight < key[destination]
      ) {
        parent[destination] = minIndex;
        key[destination] = weight;
      }
    }
  }

  let totalCost = 0;
  for (let i = 1; i < numVertices; i++) {
    totalCost += key[i];
  }

  return totalCost;
}

const edges = [
  new Edge(0, 1, 4),
  new Edge(0, 7, 8),
  new Edge(1, 2, 8),
  new Edge(1, 7, 11),
  new Edge(2, 3, 7),
  new Edge(2, 8, 2),
  new Edge(2, 5, 4),
  new Edge(3, 4, 9),
  new Edge(3, 5, 14),
  new Edge(4, 5, 10),
  new Edge(5, 6, 2),
  new Edge(6, 7, 1),
  new Edge(6, 8, 6),
  new Edge(7, 8, 7),
];

const numVertices = 9;

const minimumCost = primsAlgorithm(edges, numVertices);
console.log("Minimum cost to connect all rooms:", minimumCost);

//Question 2
// The graph is represented using an adjacency list. 
//This means that each location in the graph is a node, 
//and the roads connecting them are represented as edges.
// The adjacency list stores the neighboring nodes for each 
//node, allowing you to traverse the graph efficiently. 
//Your task is to create a bfsShortestPath function, 
//utilizing the Breadth-First Search (BFS) algorithm to find
// the shortest path from the source to the target. 
//The function should return an array that represents the 
//shortest path, starting from the source and ending at the 
//target.


// Sample Input:
// A: ['B', 'C'],  
// B: ['A', 'D', 'E'],
//    C: ['A', 'F'], 
//  D: ['B'],   
//E: ['B', 'F'],   
//    F: ['C', 'E'], in the format of Vertices: 
//    (neighboring nodes) and source node will be A 
//    and Destination node will be F


function bfsShortestPath(graph, source, target) {
  const queue = [];
  queue.push([source]);

  const visited = new Set();
  visited.add(source);

  while(queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

  if (current === target) {
    return path;
  }

  const neighbors = graph[current];
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push([...path, neighbor]);
      }
    }
  }
  return null;
}

const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

const source = "A";
const target = "F";

const shortestPath = bfsShortestPath(graph, source, target);
console.log(`Shortest path from ${source} to ${target}:`, shortestPath);

//Question 3

function dfsAllRoutes(graph, source, target) {
  const routes = [];

  function dfs(current, path) {
    if (current === target) {
      routes.push([...path, current]);
      return;
    }

    path.push(current);
    //visit each neighboring nodes
    const neighbors = graph[current];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!path.includes(neighbor)) {
        dfs(neighbor, path);
      }
    }

    path.pop();
  }

  dfs(source, []);

  return routes;
}

const g = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};
const s = "A";
const t = "F";

const allRoutes = dfsAllRoutes(g, s, t);
console.log(`All possible routes from ${source} to ${target}:`, allRoutes);

//Question 4

class PriorityQueue {
  constructor() {
    this.elements = [];
  }
 enqueue(element, priority) {
    const item = { element, priority };
    let added = false;

    for (let i = 0; i < this.elements.length; i++) {
      if (item.priority < this.elements[i].priority) {
        this.elements.splice(i, 0, item);
        added = true;
        break;
      }
    }

    if (!added) {
      this.elements.push(item);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

function dijkstra(graph, start, end) {
  const queue = new PriorityQueue();
  const distances = {};
  const previous = {};

  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[start] = 0;
  queue.enqueue(start, 0);

  while (!queue.isEmpty()) {
    const { element: current } = queue.dequeue();

    if (current === end) break;

    for (let neighbor in graph[current]) {
      const distance = distances[current] + graph[current][neighbor];

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;
        queue.enqueue(neighbor, distance);
      }
    }
  }

  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    path,
    distance: distances[end],
  };
}

const graph1 = {
  A: { B: 5, C: 2 },
  B: { D: 4, E: 2 },
  C: { B: 8, E: 7 },
  D: { E: 6, F: 3 },
  E: { F: 1 },
  F: {},
};

const startNode = "A";
const endNode = "F";

const result = dijkstra(graph1, startNode, endNode);
const path = result.path.join(" -> ");

console.log(`Shortest path: ${path}`);
console.log(`Distance: ${result.distance}`);