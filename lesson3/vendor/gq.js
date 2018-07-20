var gq = (function() {
  'use strict';

  var _search;

  var _collection;
  var _first;

  function init() {
    _collection = [];
    _first = true;
    return this;
  }

  function _findInCollection(elementType) {
    switch (elementType) {
      case '#':
        _collection = _collection.filter(function(element) {
          return element.id.match(_search);
        });
        break;
      case '.':
        _collection = _collection.filter(function(element) {
          return element.className.match(_search);
        });
        break;
      case '^':
        _collection = _collection.filter(function(element) {
          return element.tagName.match(_search);
        });
        break;
      case '+':

        _collection = _collection.filter(function(element) {
          var currentName = element.getAttribute('name');
          if (currentName === null) { return false; }
          return currentName.match(_search);
        });
        break;
      default:
    }
    return this;
  }

  function _findInDocument(element, elementType) {
    switch (elementType) {
      case '#':
        if (element.id.match(_search)) {
          _collection.push(element);
         return;
        }
        break;
      case '.':
        if (element.className.match(_search)) {
            _collection.push(element);
        }
        break;
      case '^':
        if (element.tagName.match(_search)) {
            _collection.push(element);
        }
        break;
      case '+':
        var currentName = element.getAttribute('name');
        if (currentName != null) {
          if (currentName.match(_search)) {
              _collection.push(element);
          }
        }
        break;
      default:
    }

    if (element.children) {
     for (var i = 0; i < element.children.length; i++) {
       _findInDocument(element.children[i], elementType);
     }
    }
  }


  function get(searchString) {
    var option = searchString.substring(0,1);
    _search = new RegExp('\\b' + searchString.substring(1,searchString.length) + '\\b', 'i'); // нечувствительно к регистру

    if (_first) { _findInDocument(document.body, option); }
    else { _findInCollection(option); }

    _first = false;
    return this;
  }

  function setHTML(data) {
    for(var i in _collection) {
      _collection[i].innerHTML = data;
    }
    return this;
  }

  function setText(data) {
    for(var i in _collection) {
      _collection[i].innerText = data;
    }
    return this;
  }

  function setAttr(attr, data) {
    for(var i in _collection) {
      _collection[i].setAttribute(attr, data);
    }
    return this;
  }

  function addClass(name) {
    var search = new RegExp('\\b' + name + '\\b', 'i'); // нечувствительно к регистру
    for(var i in _collection) {
      if (!_collection[i].className.match(search))
      _collection[i].className += ' ' + name;
    }
    return this;
  }

  function removeClass(name) {
    var search = new RegExp('\\b' + name + '\\b', 'i'); // нечувствительно к регистру
    for(var i in _collection) {
      if (!_collection[i].className.match(search))
      var newClass = _collection[i].className.replace(name + ' ', '');
      newClass = newClass.replace(' ' + name, '');
      _collection[i].className = newClass;
    }
    return this;
  }


  return {
    init: init,
    get: get, // #=id, .=class, ^=tag, +=name
    setHTML: setHTML,
    setText: setText,
    setAttr: setAttr,
    addClass: addClass,
    removeClass: removeClass,
  };
}());
