import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getExtension = (fileName) => fileName.split('.').at(-1);
const getRelativePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFileSync = (fileName) => fs.readFileSync(fileName);

const parser = (data, extension) => {
  switch (extension) {
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      return JSON.parse(data);
  }
};

const parseFiles = (fileName) => {
  const data = readFileSync(getRelativePath(fileName));
  const extension = getExtension(fileName);
  return parser(data, extension);
};

export default parseFiles;
