function LinkedList() {
  /**要加入链表的项 */
  let Node = function (element) {
    this.element = element
    this.next = null
  }

  let length = 0
  // 头元素
  let head = null

  /**像链表尾部添加项 */
  this.append = function (element) {
    let node = new Node(element),
      current;
    if (head === null) {
      head = node
    } else {
      current = head
      while (current.next) {
        current = current.next
      }
      current.next = node

    }
    length++
  }

  /**像链表的特定位置插入一项 */
  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = head,
        previous,
        index = 0;

      if (position === 0) {
        node.next = current;
        head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      return true
    } else {
      return false
    }
  }

  /**从链表特定位置删除一项 */
  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;
      if (position === 0) {
        head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      length--;
      return current.element
    } else {
      return null
    }
  }

  /**从列表中移除一项 */
  this.remove = function (element) { }

  /**f返回元素在链表中的索引，没有返回-1 */
  this.indexOf = function () {
    let current = head;
    index = -1;

    while (current) {
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }

  /**链表是否为空 */
  this.isEmity = function () {
    return length === 0
  }

  // 链表中包含的元素个数
  this.size = function () {
    return length
  }

  /** */
  this.getHead = function () {
    return head
  }

  /**重写toString方法，只输出元素值 */
  this.toString = function () {
    let current = head,
      string = '';
    while (current) {
      string += current.element + (current.next ? 'n' : '')
      current = current.next
    }
    return string
  }

  this.print = function () { }
}

// let list = new LinkedList()
// list.append(15)
// list.append(16)

// console.log(list)