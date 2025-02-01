import _ from 'lodash';
import { OPERATIONS } from '../buildTree.js';

const getIndent = (depth, count = 2) => ' '.repeat(depth * 4 - count);
const getLine = (key, value, depth, sign, cb) => `${getIndent(depth)}${sign} ${key}: ${cb(value, depth + 1)}`;
const getText = (lines, depth) => ['{', ...lines, `${getIndent(depth, 4)}}`].join('\n');

const stringify = (data, depth) => {
  if (!_.isObject(data)) return data;

  const lines = Object.entries(data).map(([key, value]) => getLine(key, value, depth, ' ', stringify));
  return getText(lines, depth);
};

const stylish = (tree, depth = 1) => {
  const lines = tree.map((data) => {
    const { type, name, oldValue, value, newValue, children } = data;

    switch (type) {
      case OPERATIONS.NESTED: {
        return getLine(name, children, depth, ' ', stylish);
      }
      case OPERATIONS.CREATE: {
        return getLine(name, value, depth, '+', stringify);
      }
      case OPERATIONS.DELETE: {
        return getLine(name, value, depth, '-', stringify);
      }
      case OPERATIONS.UPDATE: {
        return `${getLine(name, oldValue, depth, '-', stringify)}\n${getLine(name, newValue, depth, '+', stringify)}`;
      }
      default: {
        return getLine(name, value, depth, ' ', stringify);
      }
    }
  });
  return getText(lines, depth);
};

export default stylish;
