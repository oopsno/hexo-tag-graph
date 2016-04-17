const _ = require('lodash');
const Promise = require('bluebird');
import {GraphHandler} from './handler';

var handler = new GraphHandler();
var handlerSync = new GraphHandler();

handler.setHandler('svg', (content) =>
  Promise.resolve(content).then(svg => `<object>${svg}</object>`));
handlerSync.setHandler('svg', (content) => `<object>${content}</object>`);

function parseArgs(args) {
  if (!_.isArray(args) || args.length !== 1 || !_.isString(args[0])) {
    throw new TypeError(`Tag 'graph' needs 'String extension' as argument.`);
  } else {
    return {extension: args[0]};
  }
}

function genEmbedGraph(handler, async = true) {
  return function (args, content) {
    let {extension} = parseArgs(args);
    let fn = handler.getHandler(extension);
    if (async) {
      return Promise.resolve(content).then(fn);
    } else {
      return fn(content);
    }
  }
}

// register tags if this file is being loaded by Hexo.
try {
  hexo.extend.tag.register('graph', genEmbedGraph(handler), {
    async: true,
    ends: true
  });

  hexo.extend.tag.register('graphSync', genEmbedGraph(handlerSync, false), {
    async: false,
    ends: true
  });
} catch (err) {
  if (err.message === 'hexo is not defined') {
    console.log(`${__filename} loaded as user package.`);
  } else {
    throw err;
  }
}
