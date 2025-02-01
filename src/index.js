import parseFiles from './parser.js';
import buildTree from './buildTree.js';
import format from './formater/formater.js';

function genDiff(filePath1, filePath2, formatName = 'stylish') {
  const [parseFile1, parseFile2] = [parseFiles(filePath1), parseFiles(filePath2)];
  const tree = buildTree(parseFile1, parseFile2);
  const strDiff = format(tree, formatName);

  console.log(strDiff);
  return strDiff;
}

export default genDiff;
