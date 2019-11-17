// 在avl书中，需要对每个节点计算右子树高度（hr）与左子树高度（hl）的差值，
// 该值（hr-hl）应为0，1，-1.如果结果不是这三个值，则需要平衡该avl树，这就是
// 平衡因子的概念


function BinarySearchTree() {
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  var root = null;
  //计算二叉树的高度
  var heightNode = function (node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1
    }
  }
  //向左的单旋转
  var rotationRR = function (node) {
    var temp = node.right
    node.right = temp.left
    temp.left = node
    return temp
  }
  // 向右的单旋转
  var rotationLL = function (node) {
    var temp = node.left
    node.left = temp.right
    temp.right = node
    return temp
  }

  // 向右的双旋转
  var rotationLR = function (node) {
    node.left = rotationRR(node.left)
    return rotationLL(node)
  }

  var rotationRL = function (node) {
    node.right = rotationLL(node)
    return rotationRR(node)
  }

  var insertNode = function (node, element) {
    if (node === null) {
      node = new Node(element)
    } else if (element < node.key) {
      node.left = insertNode(node.left, element)
      if (node.left !== null) {
        //确认是否需要平衡因子
        if (heightNode(node.left) - heightNode(node.right) > 1) {
          //旋转
          if (element < node.left.key) {
            node = rotationLL(node)
          } else {
            node = rotationLR(node)
          }
        }
      }
    } else if (element > node.key) {
      node.right = insertNode(node.right, element)
      if (node.right !== null) {
        //确认平衡因子
        if (heightNode(node.right) - heightNode(node.left) > 1) {
          //旋转
          if (element > node.right.key) {
            node = rotationRR(node)
          } else {
            node = rotationRL(node)
          }
        }
      }
    }
    return node
  }

  this.insert = function (key) {
    var newNode = new Node(key);
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }
  var inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }
  //中序遍历
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback)
  }

  var preorderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key)
      preorderTraverseNode(node.left, callback)
      preorderTraverseNode(node.right, callback)
    }
  }

  // 先序遍历
  this.preorderTraverseNode = function (callback) {
    preorderTraverseNode(root, callback)
  }


  var postorderTraverseNode = function (node, callback) {
    if (node !== null) {
      postorderTraverseNode(node.left, callback)
      postorderTraverseNode(node.right, callback)
      callback(node.key)

    }
  }
  // 后序遍历
  this.postorderTraverseNode = function (callback) {
    postorderTraverseNode(root, callback)
  }

  var minNode = function (node) {
    if (node) {
      while (node && node.left) {
        node = node.left
      }
      return node.key
    }
    return null
  }

  this.min = function () {
    return minNode(root);
  }


  var maxNode = function (node) {
    if (node) {
      while (node && node.right) {
        node = node.right
      }
      return node.key
    }
    return null
  }

  this.max = function () {
    return maxNode(root);
  }

  var searchNode = function (node, key) {
    if (node === null) {
      return false
    } else {
      if (key < node.key) {
        return searchNode(node.left, key)
      } else if (key > node.key) {
        return searchNode(node.right, key)
      } else {
        return true
      }
    }
  }

  this.search = function (key) {
    return searchNode(root, key)
  }

  var removeNode = function (node, key) {
    if (node === null) {
      return null
    } else {
      if (key < node.key) {
        node.left = removeNode(node.left, key)
        return node
      } else if (key > node.key) {
        node.right = removeNode(node.right, key)
        return node
      } else { //key 等于node.key
        //一个叶节点
        if (node.left === null && node.right === null) {
          node = null
          return node
        }
        // 只有一个子节点的节点
        if (node.left === null) {
          node = node.right
          return node
        } else if (node.right === null) {
          node = node.left
          return node
        }
        // 一个有两个子节点的节点
        var aux = findMinNode(node.right)
        node.key = aux.key
        node.right = removeNode(node.right, aux.key)
        return node
      }
    }
  }
  var findMinNode = function (node) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }

  this.remove = function (key) {
    root = removeNode(root, key)
  }
}

var tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

function printNode(value) {
  console.log(value)
}


// tree.inOrderTraverse(printNode)//3 5 6 7 8 9 11 12 13 14 15 18 20 25
tree.preorderTraverseNode(printNode)//3 5 6 7 8 9 11 12 13 14 15 18 20 25