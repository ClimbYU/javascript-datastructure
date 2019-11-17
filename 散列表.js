// 使用分离链接的方法处理散列冲突

// function HashTable() {
//   var table = [];
//   var loseloseHashCode = function (key) {
//     var hash = 0;
//     for (let i = 0; i < key.length; i++) {
//       hash += key.charCodeAt(i)
//     }
//     return hash % 37

//   }

//   var ValuePair = function (key, value) {
//     this.key = key;
//     this.value = value;
//     this.toString = function () {
//       return `[${this.key}-${this.value}]`
//     }
//   }

//   this.put = function (key, value) {
//     var position = loseloseHashCode(key);
//     console.log(position + '-' + key);
//     if (table[position] == undefined) {
//       table[position] = new LinkedList();
//       table[position].append(new ValuePair(key, value))
//     }
//   }

//   this.get = function (key) {
//     var position = loseloseHashCode(key)
//     if (table[position] !== undefined) {
//       var current = table[position].getHead()
//       while (current.next) {
//         if (current.element.key === key) {
//           return current.element.value
//         }
//         current = current.next
//       }
//       if (current.element.key === key) {
//         return current.element.value
//       }
//     }
//     return undefined
//   }

//   this.remove = function (key) {
//     var position = loseloseHashCode(key)
//     if (table[position] !== undefined) {
//       var current = table[position].getHead();
//       while (current.next) {
//         if (current.element.key === key) {
//           current[position].remove(current.element);
//           if (table[position].isEmpty()) {
//             table[position] = undefined
//           }
//           return true
//         }
//         current = current.next
//       }

//       //检查是否为第一个或最后一个元素
//       if (current.element.key === key) {
//         current[position].remove(current.element);
//         if (table[position].isEmpty()) {
//           table[position] = undefined
//         }
//         return true
//       }
//     }

//     return false

//   }
// }

/**2.线性探查发解决散列冲突,如果索引为自为index的被占，就尝试index+1的位置，一直往下寻找 */
function HashTable() {
  var table = [];
  var loseloseHashCode = function (key) {
    var hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37

  }

  var ValuePair = function (key, value) {
    this.key = key;
    this.value = value;
    this.toString = function () {
      return `[${this.key}-${this.value}]`
    }
  }

  this.put = function (key, value) {
    var position = loseloseHashCode(key);
    console.log(position + '-' + key);
    if (table[position] == undefined) {
      table[position] = new ValuePair(key, value)
    } else {
      var index = ++position
      while (table[index] != undefined) {
        index++
      }
      table[index] = new ValuePair(key, value)
    }
  }

  this.get = function (key) {
    var position = loseloseHashCode(key)
    if (table[position] !== undefined) {
      var current = table[position].getHead()
      if (table[position].key === key) {
        return table[position].value
      } else {
        var index = ++position
        while (table[index] === undefined || table[index].key !== key) {
          index++
        }
        if (table[index].key === key) {
          return table[index].value
        }
      }
    }
    return undefined
  }

  this.remove = function (key) {
    var position = loseloseHashCode(key)
    if (table[position] !== undefined) {
      if (table[position].key === key) {
        table[position] = undefined
      } else {

        var index = ++position;
        while (table[index] === undefined || table[index].key !== key) {
          index++
        }
        if (table[index].key === key) {
          table[index] = undefined
        }
      }
      return true
    }

    return false

  }
}



// 更好的散列函数
var loseloseHashCode = function (key) {
  var hash = 5381
  for (var i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i)
  }

  return hash % 1013
}