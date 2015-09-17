/*!
 * SQL In-List Project
 * https://www.netstaffpro.com/
 *
 * Copyright 2015, 2015 Net Staff, LLC and other contributors
 * Released under the MIT license
 *
 * Date: 2015-09-17
 */
var MakeList = function(rawList) {
  // Constructor Variables
  this.rawList = rawList;
  this.listArray = toArray(this.rawList.split('\n'), function(n) {
    return n;
  });

  // Return Item Count
  MakeList.prototype.listCount = function() {
    return this.listArray.length;
  };

  /* Format Controller
   * ----------------------------
   * Return formatted SQL In List:
   * 1. 'numberfy': returns values in integer format
   * 2. 'stringify': returns values in string format
   * 3. 'listify': returns values as list */
  MakeList.prototype.displayList = function(dType) {
    switch (dType) {
      case "1":
        return numberfy(this.listArray);
        break;
      case "2":
        return stringify(this.listArray);
        break;
      case "3":
        return listify(this.listArray);
        break;
      default:
        return numberfy(this.listArray);
    }
  };

  MakeList.prototype.removeDuplicates = function() {
    this.listArray = rmduplicates(this.listArray);
    return true;
  };

  MakeList.prototype.removeFirst = function() {
    this.listArray.splice(0, 1);
    return true;
  };

  // Helper Functions

  function stringify(value) {
    var tS = "",
      i;
    for (i = 0; i < value.length; i++) {
      tS += "'" + value[i] + "',";
    }
    return "IN (" + tS.slice(0, -1) + ")";
  };

  function numberfy(value) {
    var tS = "",
      i;
    for (i = 0; i < value.length; i++) {
      tS += value[i] + ",";
    }
    return "IN (" + tS.slice(0, -1) + ")";
  };

  function listify(value) {
    var tS = "",
      i;
    for (i = 0; i < value.length; i++) {
      tS += value[i] + "\n";
    }
    return tS.slice(0, -1);
  };

  /* Duplicate Removal Algorithm
   * Adapted from #569 "Performance" from
   * http://www.stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array */
  function rmDuplicates(a) {
    var seen = {},
      out = [],
      len = a.length,
      i = 0,
      j = 0;
    for (i = 0; i < len; i++) {
      var item = a[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = item;
      }
    }
    return out;
  };
  
  /* Raw line-break seperated input conversion
   * to arrray based on method 'Grep' from
   * the jQuery project. Previous attempts from
   * novel javascript solution was yielding
   * unexpected behavior */
  function toArray(elems, callback, invert) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;
    // Go through the Array, only saving the items
    // that pass the validator function.
    for (; i < length; i++) {
      callbackInverse = !callback(elems[i], i);
      if (callbackInverse !== callbackExpect) {
        matches.push(elems[i]);
      }
    }
    return matches;
  };
}