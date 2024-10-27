class Node {
    constructor(data) {
        this.data = data; // Store the data
        this.left = null; // Left child
        this.right = null; // Right child
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array); // Build the tree from the provided array
    }

    // Sorts and removes duplicates from the array
    sortAndRemoveDuplicates(array) {
        return [...new Set(array.sort((a, b) => a - b))];
    }

    // Builds a balanced binary tree from the sorted array
    buildTree(array) {
        const cleanedArray = this.sortAndRemoveDuplicates(array);
        
        const construct = (arr, start, end) => {
            if (start > end) return null; // Base case

            const mid = Math.floor((start + end) / 2); // Find the middle index
            const node = new Node(arr[mid]); // Create a new node

            node.left = construct(arr, start, mid - 1); // Build left subtree
            node.right = construct(arr, mid + 1, end); // Build right subtree

            return node; // Return the constructed node
        };

        return construct(cleanedArray, 0, cleanedArray.length - 1); // Start constructing from full range
    }

    // Insert a value into the BST
    insert(value) {
        const insertRec = (node, value) => {
            if (node === null) return new Node(value); // If current position is empty, create a new node

            if (value < node.data) {
                node.left = insertRec(node.left, value); // Go left if value is less
            } else if (value > node.data) {
                node.right = insertRec(node.right, value); // Go right if value is greater
            }
            return node; // Return current node after insertion
        };

        this.root = insertRec(this.root, value); // Start insertion from root
    }

    // Delete a value from the BST
    deleteItem(value) {
        const deleteRec = (node, value) => {
            if (node === null) return null; // Base case

            if (value < node.data) {
                node.left = deleteRec(node.left, value); // Go left to find the value
            } else if (value > node.data) {
                node.right = deleteRec(node.right, value); // Go right to find the value
            } else {
                // Node with only one child or no child
                if (node.left === null) return node.right;
                else if (node.right === null) return node.left;

                // Node with two children: Get the inorder successor (smallest in the right subtree)
                const aux = this.findMin(node.right);
                node.data = aux.data; // Copy the inorder successor's content to this node
                node.right = deleteRec(node.right, aux.data); // Delete the inorder successor
            }
            return node; // Return current node after deletion
        };

        this.root = deleteRec(this.root, value); // Start deletion from root
    }

    findMin(node) {
        while (node.left !== null) { 
            node = node.left; 
        }
        return node;
    }

    // Find a value in the BST
    find(value) {
        const findRec = (node, value) => {
            if (node === null || node.data === value) return node; // Return found node or null

            if (value < node.data) return findRec(node.left, value); // Search left subtree
            else return findRec(node.right, value); // Search right subtree
        };

        return findRec(this.root, value); // Start searching from root
    }

    // Level order traversal with callback function
    levelOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        const queue = [this.root]; // Initialize queue with root

        while (queue.length > 0) {
            const currentNode = queue.shift(); // Get first element from queue

            callback(currentNode); // Call callback on current node

            if (currentNode.left !== null) queue.push(currentNode.left);   // Add left child to queue if exists
            if (currentNode.right !== null) queue.push(currentNode.right); // Add right child to queue if exists
        }
    }

    inOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        const inOrderRec = (node) => {
            if (node !== null) {
                inOrderRec(node.left);         // Visit left subtree first
                callback(node);                // Call callback on current node
                inOrderRec(node.right);        // Visit right subtree last
            }
        };

        inOrderRec(this.root);               // Start traversal from root
    }

    
    preOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        const preOrderRec = (node) => {
            if (node !== null) {
                callback(node);               // Call callback on current node first
                preOrderRec(node.left);       // Visit left subtree next
                preOrderRec(node.right);      // Visit right subtree last
            }
        };

        preOrderRec(this.root);
    }

    postOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        const postOrderRec = (node) => {
            if (node !== null) {
                postOrderRec(node.left);      // Visit left subtree first
                postOrderRec(node.right);     // Visit right subtree next
                callback(node);               // Call callback on current node last
            }
        };

        postOrderRec(this.root);
    }

    height(node = this.root) {
        if (!node) return -1;                 // Base case: height of empty tree is -1
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;  // Height of tree is max height of subtrees + 1 for current edge 
    }

    depth(node) {
        let depth = 0; // Initialize the depth counter
        let currentNode = this.root; // Start from the root of the BST
    
        while (currentNode) { // Continue until the currentNode is null
            if (currentNode === node) { // Check if the current node matches the target node
                return depth; // Return the depth if the target node is found
            }
    
            // Increment the depth counter
            depth++; 
    
            // Move left or right based on comparison
            if (node.data < currentNode.data) {
                currentNode = currentNode.left; // Move to the left child
            } else {
                currentNode = currentNode.right; // Move to the right child
            }
        }
    
        return -1; // If the loop ends without finding the node, return -1 (node not found)
    }
    

  isBalanced() { 
      const checkBalance = (node) => { 
          if (!node) return [true, -1]; 

          const [leftBalanced, leftHeight] = checkBalance(node.left);
          const [rightBalanced, rightHeight] = checkBalance(node.right);

          const balanced = leftBalanced && rightBalanced && Math.abs(leftHeight - rightHeight) <= 1;
          return [balanced, Math.max(leftHeight, rightHeight) + 1]; 
      };

      return checkBalance(this.root)[0]; 
  }

  rebalance() { 
      const sortedNodesList = []; 

      this.inOrder((node)=> sortedNodesList.push(node.data)); 

      this.root= this.buildTree(sortedNodesList);
  }
}

// pretty print 

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) { 
        return; 
    }
    if (node.right !== null) { 
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) { 
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
 };

 // Driver Script

const generateArr = (length = 10) => {  
    return Array.from({ length }, () => Math.floor(Math.random() * length));
 };
 
 const arr = generateArr(15);
 console.log("Initial Array:", arr);
 
 let tree = new Tree(arr);
 console.log("Initial Tree:");
 prettyPrint(tree.root);
 
 console.log("\nInserting values:");
 tree.insert(10);
 tree.insert(20);
 tree.insert(5);
 prettyPrint(tree.root);
 
 console.log("\nFinding value 10:", tree.find(10));
 console.log("Finding value 15:", tree.find(15));
 
 console.log("\nLevel Order Traversal:");
 tree.levelOrder((node)=> console.log(node.data));
 
 console.log("\nIn Order Traversal:");
 tree.inOrder((node)=> console.log(node.data));
 
 console.log("\nPre Order Traversal:");
 tree.preOrder((node)=> console.log(node.data));
 
 console.log("\nPost Order Traversal:");
 tree.postOrder((node)=> console.log(node.data));
 
 console.log("\nTree Height:", tree.height());
 console.log("Depth of Node with value 10:", tree.depth(tree.find(10)));
 
 console.log("\nIs Tree Balanced?", tree.isBalanced());
 tree.rebalance();
 console.log("Rebalanced Tree:");
 prettyPrint(tree.root);
 
 console.log("\nDeleting values:");
 tree.deleteItem(10);
 prettyPrint(tree.root);
 
 tree.deleteItem(20);
 prettyPrint(tree.root);
 
 tree.deleteItem(5);
 prettyPrint(tree.root);