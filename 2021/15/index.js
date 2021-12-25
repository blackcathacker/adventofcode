const { readByLine } = require("../util");

function findShortestPath(graphArray) {
  function makeNodeId(x, y) {
    if (x >= 0 && y >= 0 && x < graphArray[0].length && y < graphArray.length)
      return `${x},${y}`;
  }
  const distances = {};
  const nodeQueue = ["0,0"];
  distances["0,0"] = 0;
  while (nodeQueue.length > 0) {
    const current = nodeQueue.shift();
    const [x, y] = current.split(",").map(Number);
    const adjacent = [
      makeNodeId(x + 1, y),
      makeNodeId(x - 1, y),
      makeNodeId(x, y + 1),
      makeNodeId(x, y - 1),
    ].filter((_) => _);
    adjacent.forEach((adj) => {
      const [adjX, adjY] = adj.split(",").map(Number);
      const newDistance = distances[current] + graphArray[adjY][adjX];
      if (distances[adj] === undefined || newDistance < distances[adj]) {
        distances[adj] = newDistance;
        nodeQueue.push(adj);
      }
    });
    // console.log(distances, nodeQueue);
  }
  const endLoc = `${graphArray[0].length - 1},${graphArray.length - 1}`;
  // console.log(distances);
  // console.log(endLoc);
  console.log(distances[endLoc]);
}

async function runFirst() {
  const graphArray = (await readByLine(`${__dirname}/input.txt`)).map((l) =>
    l.split("").map(Number)
  );
  findShortestPath(graphArray);
}

function increaseRisk(array, times) {
  return array.map((r) => (r + times > 9 ? r - 9 + times : r + times));
}

async function runSecond() {
  const initialGraph = (await readByLine(`${__dirname}/input.txt`)).map((l) =>
    l.split("").map(Number)
  );
  const graphWidened = initialGraph.map((l) => {
    return [
      ...l,
      ...increaseRisk(l, 1),
      ...increaseRisk(l, 2),
      ...increaseRisk(l, 3),
      ...increaseRisk(l, 4),
    ];
  });
  const graphArray = [
    ...graphWidened,
    ...graphWidened.map((l) => increaseRisk(l, 1)),
    ...graphWidened.map((l) => increaseRisk(l, 2)),
    ...graphWidened.map((l) => increaseRisk(l, 3)),
    ...graphWidened.map((l) => increaseRisk(l, 4)),
  ];
  // console.log(graphArray.map((l) => l.join("")).join("\n"));
  findShortestPath(graphArray);
}

runFirst()
  .then(runSecond)
  .then(() => console.log("finished"));
