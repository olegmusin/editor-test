/**
 * Refer: https://gist.github.com/jasonrhodes/2321581
 *
 * @param {Object} object The object to search
 * @param {String} propertyName A dot notation style parameter reference (i.e. "urls.small")
 *
 * @returns {Object} The value of the property, or undefined if not found.
 */
export default function getProperty(object, propertyName) {
  const arr = propertyName.split('.');
  let result = object;

  while (arr.length && result) {
    result = result[arr.shift()];
  }

  return result;
}
