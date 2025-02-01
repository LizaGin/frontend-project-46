import _ from 'lodash';

export const OPERATIONS = {
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  UNCHANGED: 'UNCHANGED',
  NESTED: 'NESTED',
};

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const tree = sortedKeys.map((key) => {
    const value = obj1[key];
    const newValue = obj2[key];

    if (_.isObject(value) && _.isObject(newValue)) {
      return { key, type: OPERATIONS.NESTED, children: buildTree(value, newValue) };
    }
    if (key in obj1 && !(key in obj2)) {
      return { key, type: OPERATIONS.DELETE, value };
    }
    if (!(key in obj1) && key in obj2) {
      return { key, type: OPERATIONS.CREATE, newValue };
    }
    if (value !== newValue) {
      return {
        key,
        type: OPERATIONS.UPDATE,
        value,
        newValue,
      };
    }

    return { key, type: OPERATIONS.UNCHANGED, value };
  });

  return tree;
};

export default buildTree;
