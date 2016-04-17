const _ = require('lodash');
const Promise = require('bluebird');

class GraphHandler {
  constructor() {
    this.routines = new Map();
  }

  getHandler(extension) {
    if (!_.isString(extension)) {
      throw new TypeError(`extension must be a String, not ${typeof extension}`);
    }
    let fn = this.routines.get(extension);
    if (fn === undefined) {
      throw new Error(`Unknown format ${extension}`);
    } else {
      return fn;
    }
  }

  setHandler(extension, fn) {
    if (!_.isString(extension)) {
      throw new TypeError(`extension must be a String, not ${typeof extension}`);
    }
    if (!_.isFunction(fn)) {
      throw new TypeError(`fn must be a Function, not ${typeof fn}`);
    }
    this.routines.set(extension, fn);
  }

  setHandlers(obj) {
    for ([extension, fn] in _.entriesIn(obj)) {
      this.setHandler(extension, fn);
    }
  }
}

export {GraphHandler};
