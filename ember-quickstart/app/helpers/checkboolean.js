import { helper } from '@ember/component/helper';

export default helper(function checkboolean(positional /*, named*/) {
  const [initial, author] = positional;
  return initial == author;
});
