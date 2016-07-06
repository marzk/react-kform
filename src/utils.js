export function isFormField(type) {
  switch (type) {
    case 'input':
      return true;
    default:
      return false;
  }
}

export function debounce(f, wait) {
  let _timeId = null;
  return function (...args) {
    clearTimeout(_timeId);
    _timeId = setTimeout(() => (f.apply(this, args)), wait);
  }
}
