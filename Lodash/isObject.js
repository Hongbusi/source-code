/**
 * Check the `value` is an object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `else`.
 */

function isObject(value) {
  const type = typeof value;
  return value !=null && (type === 'object' || type === 'function');
}

export default isObject;

// test
console.log(isObject({}));
console.log(isObject([1, 2, 3]));
console.log(isObject(Function));
console.log(isObject(null));
