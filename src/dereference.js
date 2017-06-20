module.exports = function dereference(cells, array) {
  return deepFlatten(cells).map(index => array[index]);
};

function deepFlatten(arr) {
  arr = Array.prototype.concat.apply([], arr);
  return arr.some(Array.isArray) ? deepFlatten(arr) : arr;
}
