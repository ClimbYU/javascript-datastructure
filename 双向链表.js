function DoublyLinkedList() {
  let Node = function (element) {
    this.element = element
    this.next = null;
    this.previous = null;
  }

  let length = 0,
    head = null,
    tail = null;
  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = head,
        index = 0,
        previous = null;
      if (position === 0) {
        if (!head) {
          head = node;
          tail = node
        } else {
          node.next = current
          current.previous = node;
          head = node
        }
      } else if (position === length) {
        current = tail;
        current.next = node;
        node.previous = current;
        tail = node
      } else {

        while (index++ < position) {
          previous = current;
          current = current.next
        }

        node.next = current
        node.previous = previous;
        previous.next = node;
        current.previous = node;
      }
      length++
      return true
    } else {
      return false
    }
  }

  this.removeAt = function (position) {
    if (position > -1 && position <= length) {
      let current = head,
        index = 0,
        previous;
      if (position === 0) {
        if (length === 1) {
          tail = null;
          head = null
        } else {

          head = current.next
          head.previous = null
        }
      } else if (position === length - 1) {
        current = tail;
        previous = current.previous
        tail = previous
        tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current
        current.next.previous = previous
      }
      length--;
      return current.element
    } else {
      return false
    }
  }
}