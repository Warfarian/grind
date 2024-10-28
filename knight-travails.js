const directions = [[-2,-1], [-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2]];

class Node {
  constructor(row, col, moves,path){
    this.row = row;
    this.col = col;
    this.moves = moves;
    this.path = path;
  }
  
  getPositionString(){
    return `${this.row}, ${this.col}`;
  }
}

const getNeighbors = (row,col) => {
  const neighbors = [];
  
  for (const direction of directions) {
    const [rowChange, colChange] = direction;
    
    const neighborRow = row + rowChange;
    const neighborCol = col + colChange;
    
    neighbors.push([neighborRow, neighborCol]);
  } 
  
  return neighbors;
}

const displayResult = (moves,path) => {
  const message = `You made it in ${moves} moves! Here's your path: ${path.join(" -> ")}`;
  return message;
  
}

function knightMoves([startRow,startCol],[targetRow,targetCol]){
  const queue = [];
  const startNode = new Node(startRow,startCol,0,[[startRow,startCol]]);
  queue.push(startNode);
  
  const visited = new Set();
  
  while(queue.length > 0){
    //remove node
    const node = queue.shift();
    const {row, col, moves, path} = node;
    
    //process node
    if (row === targetRow && col === targetCol) return displayResult(moves,path);
    visited.add(node.getPositionString());
    
    //add neighbors
    for (const neighbor of getNeighbors(row,col)){
      const [neighborRow, neighborCol] = neighbor;
      const neighborNode = new Node(neighborRow, neighborCol, moves + 1, [...path,[neighborRow, neighborCol]]);
      
      if (visited.has(neighborNode.getPositionString())) continue; //skip if already visited
      if (neighborRow < 0 || neighborRow > 7) continue; //skip if off the board
      if (neighborCol < 0 || neighborCol > 7) continue; //skip if off the board
      
      queue.push(neighborNode);
    }
  }
}

//tests
console.log(knightMoves([0,0],[1,2])); //You made it in 1 moves! Here's your path: 0,0 -> 1,2
console.log(knightMoves([0,0],[3,3])); //You made it in 2 moves! Here's your path: 0,0 -> 1,2 -> 3,3
console.log(knightMoves([3,3],[0,0])); //You made it in 2 moves! Here's your path: 3,3 -> 1,2 -> 0,0
console.log(knightMoves([3,3],[4,3])); //You made it in 3 moves! Here's your path: 3,3 -> 1,2 -> 2,4 -> 4,3