import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

const expectedStylish = readFile('expected-stylish.txt');
const expectedPlain = readFile('expected-plain.txt');
const expectedJson = readFile('expected-json.txt');

test('JSON and YAML files, stylish-formatter', () => {
  expect(getDiff('__fixtures__/1.json', '__fixtures__/2.yaml', 'stylish')).toEqual(expectedStylish);
});

test('JSON and YAML files, plain-formatter', () => {
  expect(getDiff('__fixtures__/1.yaml', '__fixtures__/2.json', 'plain')).toEqual(expectedPlain);
});

test('JSON and YAML files, json-formatter', () => {
  expect(getDiff('__fixtures__/1.json', '__fixtures__/2.yaml', 'json')).toEqual(expectedJson);
});
