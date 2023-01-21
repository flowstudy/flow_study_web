export function generateRandomInteger(minInteger, maxInteger, includeMax = false) {
  const min = (minInteger < maxInteger) ? Math.floor(minInteger) : Math.floor(maxInteger);
  const max = (minInteger < maxInteger) ? Math.ceil(maxInteger) : Math.ceil(minInteger);
  const randomRange = includeMax ? (max - min + 1) : (max - min);
  return Math.floor(Math.random() * randomRange) + min;
}
