import _ from 'lodash';
import { OPERATIONS } from '../buildTree.js';

const normalize = (value) => (_.isObject(value) ? '[complex value]' : value);

const plain = (tree, path = '') => {
  const lines = tree.flatMap((data) => {
    const {
      type, key, value, newValue, children,
    } = data;

    switch (type) {
      case OPERATIONS.NESTED: {
        return plain(children, `${path}${key}.`);
      }
      case OPERATIONS.CREATE: {
        return `Property '${path}${key}' was added with value: ${normalize(newValue)}`;
      }
      case OPERATIONS.DELETE: {
        return `Property '${path}${key}' was removed`;
      }
      case OPERATIONS.UPDATE: {
        return `Property '${path}${key}' was updated. From ${normalize(value)} to ${normalize(newValue)}`;
      }
      default:
        return '';
    }
  });
  return lines.join('\n');
};

export default plain;
