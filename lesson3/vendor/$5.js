var $5 = (function() {

  //
  // приватные переменные
  // _first - показывает вызываем ли get первый раз (и ищем в document.body)
  // или же второй и более раз - и ищем в _collection
  // в этом случае работает принцип последовательной фильтрации
  // мы можем выбрать сначала все элементы с классом class1 - а потом
  // среди них выбирать элементы с именами name1, например.
  //
  // технически можно реализовать и логику последовательного ДОБАВЛЕНИЯ новых выборок
  // - но нужно ли это? все зависит от поставленной задачи
  //
  // _collection - массив, где храним отобранные элементы, для работы с ними впоследствии
  //
  function Collection() {
    this._first = true;
    this._collection = [];
  }

  // приватные методы
  // реализуют замену getElementById, getElementsByClassName, getElementsByTagName, getElementsByName

  // это поиск рекурсией в document.body
  function _findInDocument(element, elementType, search) {
    switch (elementType) {
      case '#':
        if (element.id.match(search)) {
          this._collection.push(element);
         return;
        }
        break;
      case '.':
        if (element.className.match(search)) {
            this._collection.push(element);
        }
        break;
      case '^':
        if (element.tagName.match(search)) {
            this._collection.push(element);
        }
        break;
      case '+':
        var currentName = element.getAttribute('name');
        if (currentName != null) {
          if (currentName.match(search)) {
              this._collection.push(element);
          }
        }
        break;
      default:
    }

    if (element.children) {
     for (var i = 0; i < element.children.length; i++) {
       _findInDocument.call(this, element.children[i], elementType, search);
     }
    }
  }

  // это поиск фильтрацией в _collection
  function _findInCollection(elementType, search) {
    switch (elementType) {
      case '#':
        this._collection = this._collection.filter(function(element) {
          return element.id.match(search);
        });
        break;
      case '.':
        this._collection = this._collection.filter(function(element) {
          return element.className.match(search);
        });
        break;
      case '^':
        this._collection = this._collection.filter(function(element) {
          return element.tagName.match(search);
        });
        break;
      case '+':
        this._collection = this._collection.filter(function(element) {
          var currentName = element.getAttribute('name');
          if (currentName === null) { return false; }
          return currentName.match(search);
        });
        break;
      default:
    }
    // return this;
  }

  // ПУБЛИЧНЫЕ МЕТОДЫ

  // get - выбираем в документе или в уже выбранной коллекции только элементы
  // с конкретными id / class / tag / name

  // #=id, .=class, ^=tag, +=name
  Collection.prototype.get = function(searchString) {
    var option = searchString.substring(0,1);
    var search = new RegExp('\\b' + searchString.substring(1,searchString.length) + '\\b', 'i'); // нечувствительно к регистру

    if (this._first) { _findInDocument.call(this, document.body, option, search); }
    else { _findInCollection.call(this, option, search); }

    this._first = false;

    return this;
  }

  // setHTML - устанавливаем innerHTML значение data
  Collection.prototype.setHTML = function(data) {
    for(var i in this._collection) {
      this._collection[i].innerHTML = data;
    }
    return this;
  }

  // setText - устанавливаем innerText значение data
  Collection.prototype.setText = function(data) {
    for(var i in this._collection) {
      this._collection[i].innerText = data;
    }
    return this;
  }

  // setAttr - устанавливаем attribute значение data
  Collection.prototype.setAttr = function(attr, data) {
    for(var i in this._collection) {
      this._collection[i].setAttribute(attr, data);
    }
    return this;
  }

  // addClass - добавляем новый класс (если уже был - не добавляем)
  Collection.prototype.addClass = function(name) {
    var search = new RegExp('\\b' + name + '\\b', 'i'); // нечувствительно к регистру
    for(var i in this._collection) {
      if (!this._collection[i].className.match(search))
      this._collection[i].className += ' ' + name;
    }
    return this;
  }

  // removeClass - удаляем класс (если такого нет - ничего не удаляем)
  Collection.prototype.removeClass = function(name) {
    var search = new RegExp('\\b' + name + '\\b', 'i'); // нечувствительно к регистру
    for(var i in this._collection) {
      if (this._collection[i].className.match(search)) {
        var newClass = this._collection[i].className.replace(name + ' ', '');
        newClass = newClass.replace(' ' + name, '');
        this._collection[i].className = newClass;
      }
    }
    return this;
  }

  // del - удаляем все выбранные в коллекции элементы с разметки DOM
  Collection.prototype.del = function() {
    for(var i in this._collection) {
      this._collection[i].parentNode.removeChild(this._collection[i]);
    }
    return;
  }


  return function(param) {
    if (param === undefined) {
      return new Collection();
    } else {
      return (new Collection()).get(param);
    }
  };

})();
