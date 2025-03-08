import { Recommendation } from "@/services/Recommendation/Recommendation";

class Node<T> {
  public data: T;

  public next: Node<T> | null = null;
  public previous: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

interface ILinkedList<T> {
  insert(data: T): Node<T>;
  toArray(): T[];
  size(): number;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  public insert(data: T): Node<T> {
    const newNode = new Node(data);

    if (!this.head) this.head = this.tail = newNode;
    else {
      this.tail!.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }

    return newNode;
  }

  public toArray(): T[] {
    const resultingArray: T[] = [];

    let iterableNode = this.head;

    while (iterableNode) {
      resultingArray.push(iterableNode.data);
      iterableNode = iterableNode.next;
    }

    return resultingArray;
  }

  public size(): number {
    let listSize = 0;
    let iterableNode = this.head;

    while (iterableNode) {
      listSize += 1;
      iterableNode = iterableNode.next;
    }

    return listSize;
  }
}

export default LinkedList;

export const getRecommendationsListFromRecommendationsArray = (
  recommendations: Recommendation[]
): LinkedList<Recommendation> => {
  const resultingList = new LinkedList<Recommendation>();

  recommendations.forEach((recommendation) => {
    resultingList.insert(recommendation);
  });

  return resultingList;
};
