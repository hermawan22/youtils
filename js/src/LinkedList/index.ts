interface Types<T> {
  unshift(data: T): Node<T>;
}

class Node<T> {
  public data: T;
  public next: Node<T> | null | undefined = null;
  public prev: Node<T> | null | undefined = null;

  public constructor(data: T) {
    this.data = data;
  }
}

export class LinkedList<T> implements Types<T> {
  private head: Node<T> | null | undefined;

  constructor() {
    this.head = null;
  }

  private getLast(node: Node<T>): Node<T> {
    return node.next ? this.getLast(node.next) : node;
  }

  public first() {
    return this.head ? this.head.data : undefined;
  }

  public isEmpty() {
    return this.head == null;
  }

  public last() {
    if (!this.head) {
      return this;
    }

    const last = this.head && this.getLast(this.head)
    return last.data;
  }

  public push(data: T): Node<T> {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      const lastNode = this.getLast(this.head);
      node.prev = lastNode;
      lastNode.next = node;
    }
    return node;
  }

  public shift() {
    if (this.isEmpty()) {
      return this;
    }

    const node = this.head;
    this.head = node?.next;

    return this;
  }

  public pop() {
    if (this.isEmpty()) {
      return this;
    }

    let node = this.head;

    if (node?.next == null) {
      this.shift();
      return this;
    }

    while (node?.next?.next != null) {
      node = node.next;
    }

    node.next = null;
    return this;
  }

  public remove(data: Node<T>): void {
    if (!data.prev) {
      this.head = data.next;
    } else {
      const prevNode = data.prev;
      prevNode.next = data.next;
    }
  }

  public size(): number {
    return this.traverse().length;
  }

  public traverse(): T[] {
    const array: T[] = [];
    if (!this.head) {
      return array;
    }

    const addToArray = (data: Node<T>): T[] => {
      array.push(data.data);
      return data.next ? addToArray(data.next) : array;
    };
    return addToArray(this.head);
  }

  public unshift(data: T): Node<T> {
    let node = new Node(data);
    node.next = this.head;
    this.head = node;
    return node;
  }
}
