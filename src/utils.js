export function promisyValidation(value, { f, msg = '' }) {
  return new Promise((resolve) => {
    resolve(f(value));
  }).then((isValid) => {
    if (typeof isValid === 'boolean') {
      return { isValid, msg };
    }
    return isValid;
  }).then((rel) => {
    if (rel.isValid) {
      return true;
    }
    return Promise.reject({
      isValid: rel.isValid,
      msg: rel.msg,
    });
  });
}

export function isFormField(field) {
  switch (field.type) {
    case 'input':
      return true;
    default:
      return false;
  }
}

export function compareValidation(cur, next) {
  if (cur &&
      cur.isValid === next.isValid &&
      cur.msg === next.msg) {
    return true;
  }
  return false;
}
