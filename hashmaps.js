class Node {
    constructor(key, value = null, next = null) {
      this.key = key;
      this.value = value;
      this.next = next;
    }
  }
  
  class HashMap {
    constructor() {
      this.bucketsArray = new Array(16).fill(null);
      this.loadFactor = 0.75;
      this.capacity = this.bucketsArray.length;
      this.occupied = 0;
    }
  
    hash(key) {
      let hashKey = 0;
      const prime = 11;
      for (let i = 0; i < key.length; i += 1) {
        hashKey += key.charCodeAt(i) * prime;
      }
      return hashKey % this.bucketsArray.length;
    }
  
    resize() {
      const oldArray = this.bucketsArray;
      this.capacity *= 2; // Double the size
      this.bucketsArray = new Array(this.capacity).fill(null);
      this.occupied = 0;
  
      oldArray.forEach((bucket) => {
        let current = bucket;
        while (current !== null) {
          this.add(current.key, current.value); // Keys are re-hashed
          current = current.next;
        }
      });
    }
  
    add(key, value) {
      if (this.occupied / this.capacity >= this.loadFactor) {
        this.resize();
      }
      const bucket = this.hash(key);
      if (!this.has(key)) {
        // if the hashmap doesn't contain key, add a new node
        const newNode = new Node(key, value);
        if (this.bucketsArray[bucket] === null) {
          this.occupied += 1;
          this.bucketsArray[bucket] = newNode;
        } else {
          let current = this.bucketsArray[bucket];
          while (current.next !== null) {
            current = current.next;
          }
          current.next = newNode;
        }
      } else {
        // if the key exists, update the value
        let current = this.bucketsArray[bucket];
        while (current !== null && current.key !== key) {
          current = current.next;
        }
        if (current !== null) {
          current.value = value;
        }
      }
    }
  
    get(key) {
      const bucket = this.hash(key);
      let current = this.bucketsArray[bucket];
      while (current.key !== null && current.key !== key) {
        current = current.next;
      }
      if (current === null) {
        return null;
      }
      return current.key;
    }
  
    has(key) {
      const bucket = this.hash(key);
      let current = this.bucketsArray[bucket];
      while (current !== null) {
        if (current.key === key) {
          return true;
        }
        current = current.next;
      }
      return false;
    }
  
    remove(key) {
      const bucket = this.hash(key);
      let current = this.bucketsArray[bucket];
      let previous = null;
  
      while (current !== null && current.key !== key) {
        previous = current;
        current = current.next;
      }
  
      if (current === null) {
        return; // Key not found
      }
  
      if (previous === null && current.next === null) {
        // Remove first node that has no successors
        this.occupied -= 1;
        this.bucketsArray[bucket] = current.next;
      } else if (previous === null) {
        // Remove first node that has successors
        this.bucketsArray[bucket] = current.next;
      } else {
        // Remove node and connects the next
        previous.next = current.next;
      }
    }
  
    length() {
      let length = 0;
      this.bucketsArray.forEach((bucket) => {
        let current = bucket;
        if (bucket !== null) {
          length += 1;
          while (current.next !== null) {
            length += 1;
            current = current.next;
          }
        }
      });
      return length;
    }
  
    clear() {
      this.bucketsArray = new Array(16).fill(null);
      this.occupied = 0;
    }
  
    keys() {
      const arrayOfKeys = [];
      this.bucketsArray.forEach((bucket) => {
        let current = bucket;
        if (bucket !== null) {
          arrayOfKeys.push(current.key);
          while (current.next !== null) {
            current = current.next;
            arrayOfKeys.push(current.key);
          }
        }
      });
      return arrayOfKeys;
    }
  
    values() {
      const arrayOfValues = [];
      this.bucketsArray.forEach((bucket) => {
        let current = bucket;
        if (bucket !== null) {
          arrayOfValues.push(current.value);
          while (current.next !== null) {
            current = current.next;
            arrayOfValues.push(current.value);
          }
        }
      });
      return arrayOfValues;
    }
  
    entries() {
      const arrayOfEntries = [];
      this.bucketsArray.forEach((bucket) => {
        let current = bucket;
        if (bucket !== null) {
          arrayOfEntries.push([current.key, current.value]);
          while (current.next !== null) {
            current = current.next;
            arrayOfEntries.push([current.key, current.value]);
          }
        }
      });
      return arrayOfEntries;
    }
  }

// const map = new HashMap();
// map.add("apple", 5);
// map.add("banana", 3);
// map.add("apple", 10); // Updates "apple" to 10

// console.log(map.get("apple")); // Outputs: 10
// console.log(map.has("banana")); // Outputs: true
// console.log(map.keys()); // Outputs: ["apple", "banana"]
// console.log(map.values()); // Outputs: [10, 3]
// console.log(map.entries()); // Outputs: [["apple", 10], ["banana", 3]]

// map.remove("banana");
// console.log(map.has("banana")); // Outputs: false
