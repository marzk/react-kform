export function validate(value, validations) {
  const promises = [];

  validations.every(({ f, msg = '' }) => {
    const result = f(value);
    let rel, p;
    if (typeof result === 'boolean') {
      rel = result;
      if (result) {
        p = Promise.resolve({ isValid: result, msg: '' });
      } else {
        p = Promise.reject({ isValid: result, msg });
      }
    } else {
      rel = true;
      p = Promise.resolve(result).then(vResult => {
        if (vResult.isValid) {
          return vResult;
        } else {
          return Promise.reject(vResult);
        }
      });
    }
    promises.push(p);

    return rel;
  });

  return Promise.all(promises);
}
