import fs from 'fs';
import _ from 'lodash';
import path from 'path';

//TODO: add relative path
function parseFiles(filePath1, filePath2) {
  const parseFile1 = JSON.parse(fs.readFileSync(path.resolve(filePath1)));
  const parseFile2 = JSON.parse(fs.readFileSync(path.resolve(filePath2)));
  return [parseFile1, parseFile2];
}

//TODO: add internal objects
function compare(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  let diff = {};

  for (let key of sortedKeys) {
    if (key in obj1 && key in obj2) {
      if (obj1[key] === obj2[key]) {
        diff[`  ${key}`] = obj1[key];
      } else {
        diff[`- ${key}`] = obj1[key];
        diff[`+ ${key}`] = obj2[key];
      }
    } else if (key in obj1 && !(key in obj2)) {
      diff[`- ${key}`] = obj1[key];
    } else if (!(key in obj1) && key in obj2) {
      diff[`+ ${key}`] = obj2[key];
    }
  }

  return diff;
}

//TODO: add internal objects
function stringify(obj) {
  const strObj = JSON.stringify(obj);
  const props = strObj
    .slice(1)
    .slice(0, -1)
    .split(',')
    .map((e) => `\t${e},`.replace(/"/g, '').replace(/:/g, ': '));
  props.unshift('{');
  props.push('}');
  const diff = props.join('\n');
  return diff;
}

function genDiff(filePath1, filePath2) {
  const [parseFile1, parseFile2] = parseFiles(filePath1, filePath2);
  const diff = compare(parseFile1, parseFile2);
  const strDiff = stringify(diff);
  console.log(strDiff);
}

export default genDiff;
