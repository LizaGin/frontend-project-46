import _ from 'lodash';
import { OPERATIONS } from '../buildTree.js';

const normalize = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const plain = (tree, path = '') => {
  const lines = tree
    .flatMap((data) => {
      const {
        type, name, oldValue, value, newValue, children,
      } = data;

      switch (type) {
        case OPERATIONS.NESTED: {
          return plain(children, `${path}${name}.`);
        }
        case OPERATIONS.CREATE: {
          return `Property '${path}${name}' was added with value: ${normalize(value)}`;
        }
        case OPERATIONS.DELETE: {
          return `Property '${path}${name}' was removed`;
        }
        case OPERATIONS.UPDATE: {
          return `Property '${path}${name}' was updated. From ${normalize(oldValue)} to ${normalize(newValue)}`;
        }
        case OPERATIONS.UNCHANGED:
        default:
          return [];
      }
    })
    .filter(Boolean);
  return lines.join('\n');
};

export default plain;
