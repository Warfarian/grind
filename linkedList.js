class Node{
  constructor(element){
      this.element = element || null;
      this.next = null;
  }
}

class LinkedList{
  constructor(){
      this.head = null;
  }

  prepend(element){
      let currentNode = null;
      if (this.head != null) currentNode = this.head;
      this.head = new Node(element);
      this.head.next = currentNode;
  }

  append(element){
      if (this.head==null)this.prepend(element);
      else{
          let currentNode = this.head;
          while (currentNode.next != null){
              currentNode = currentNode.next;
          }
          currentNode.next = new Node(element);
      }
  }

  size(){
      let currentNode = this.head;
      let length = 0;
      while (currentNode!=null){
          length++;
          currentNode = currentNode.next;
      }
      return length;
  }

  Head(){
      return this.head;
  }

  tail(){
      let currentNode = this.head;
      while (currentNode.next != null){
          currentNode = currentNode.next;
      }
      return currentNode;
  }

  at(index){
      let currentNode = this.head;
      if (index < 0) return "no item";
      for (let i =0; i<index; i++){
          currentNode = currentNode.next;
          if (currentNode == null) return "no item";
      } 
      return currentNode;
  }

  pop(){
      let currentNode = this.head;
      let previousNode = null;
      while (currentNode.next != null){
          previousNode = currentNode;
          currentNode = currentNode.next;
      }
      previousNode.next = null;
  }

  contains(element){
      let currentNode = this.head;
      while (currentNode != null){
          if (currentNode.element == element) return true;
          currentNode = currentNode.next;
      }
      return false;
  }

  find(element){
      let currentNode = this.head;
      let index = 0;
      while (currentNode!= null){
          if (currentNode.element == element) return index;
          currentNode = currentNode.next;
          index++;
      }
      return null;
  }

  toString(){
      let currentNode = this.head;
      let stringList = "";
      while(currentNode!= null){
          stringList += `(${currentNode.element}) ->`;
          currentNode = currentNode.next;
      } 
      return (stringList += "null");
  }

  insertAt(element,index){
      if (this.head == null) return "empty list";
      else{
          let cur = this.head;
          let previousNode = null;
          for (let i = 0; i<index; i++){
              previousNode = cur;
              cur = cur.next;
              if (cur == null) break;
          }
          const currentNode = new Node(element);
          previousNode.next = currentNode;
          currentNode.next = cur;
      }
  }

  removeAt(index){
      if (this.head == null) return "empty";
      else{
          let cur = this.head;
          let previousNode = null;
          for (let i = 0; i<index; i++){
              previousNode = cur;
              cur = cur.next;
              if (cur == null) return "no item"
          }
          previousNode.next = cur.next;
      }
  }
}


const linkedList = new LinkedList();

linkedList.prepend("test1");
linkedList.append("test2");
linkedList.append("test3");
console.log(linkedList.toString()); // (test1) -> (test2) -> (test3) -> null
console.log(linkedList.size()); // 3
console.log(linkedList.Head()); // return head Node
console.log(linkedList.tail()); // Node { element: 'test3', nextNode: null }
console.log(linkedList.at(2)); // Node { element: 'test3', nextNode: null }
console.log(linkedList.at(4)); // There is no item for this index
linkedList.pop();
console.log(linkedList.toString()); // (test1) -> (test2) -> null
console.log(linkedList.contains("test1")); // true
console.log(linkedList.find("test2")); // 1
linkedList.prepend("test3");
console.log(linkedList.toString()); // (test3) -> (test1) -> (test2) -> null
linkedList.insertAt("test4",2);
console.log(linkedList.toString()); // (test3) -> (test1) -> (test4) -> (test2) -> null
linkedList.insertAt("test5",8);
console.log(linkedList.toString()); // (test3) -> (test1) -> (test4) -> (test2) -> (test5) -> null
linkedList.removeAt(2);
console.log(linkedList.toString()); // (test3) -> (test1) -> (test2) -> (test5) -> null