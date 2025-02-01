import _ from 'lodash';
import { OPERATIONS } from '../buildTree.js';

const getIndent = (depth) => ' '.repeat(depth * 2);
const getLine = (key, value, depth, sign, cb) => `${getIndent(depth)}${sign} ${key}: ${cb(value, depth + 1)}`;
const getText = (lines, depth) => ['{', ...lines, `${getIndent(depth / 2)}}`].join('\n');

const stringify = (data, depth) => {
  if (!_.isObject(data)) return data;

  const lines = Object.entries(data).map(([key, value]) => getLine(key, value, depth, ' ', stringify));
  return getText(lines, depth);
};

const stylish = (tree, depth = 0) => {
  const lines = tree.map((data) => {
    const {
      type, key, value, newValue, children,
    } = data;

    switch (type) {
      case OPERATIONS.NESTED: {
        return getLine(key, children, depth, ' ', stylish);
      }
      case OPERATIONS.CREATE: {
        return getLine(key, newValue, depth, '+', stringify);
      }
      case OPERATIONS.DELETE: {
        return getLine(key, value, depth, '-', stringify);
      }
      case OPERATIONS.UPDATE: {
        return `${getLine(key, value, depth, '-', stringify)}\n${getLine(key, newValue, depth, '+', stringify)}`;
      }
      default: {
        return getLine(key, value, depth, ' ', stringify);
      }
    }
  });
  return getText(lines, depth);
};

export default stylish;
