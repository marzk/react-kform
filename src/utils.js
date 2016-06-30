export function promisyAsyncValidating({ v, msg = '' }) {
  return Promise.resolve(v)
    .then(result => {
      const rel = {
        isValid: result.isValid,
        msg: result.msg || msg,
      };
      return rel.isValid ? true : Promise.reject(rel);
    });
}

export function validate(validations, value, {
  resolve = () => {},
  reject = () => {},
  needAsync = false,
}) {
  if (!validations) return { isValid: true };
  const asyncValidatings = [];
  const rel = {
    status: 'pending',
  };
  let msg;
  // 同步处理
  const isAllValid = validations.every(v => {
    let isValid = v.f(value);
    msg = v.msg;
    if (!(typeof isValid === 'boolean')) {
      asyncValidatings.push({
        v: isValid,
        msg: v.msg,
      });
      isValid = true;
    }
    return isValid;
  });

  // 异步处理
  rel.asyncValidation = needAsync && Promise.all(asyncValidatings.map(promisyAsyncValidating))
    .then(() => {
      rel.status = 'fulfilled';
    })
    .catch(reason => {
      rel.status = 'rejected';
      rel.isValid = false;
      reject(reason);
    });

  if (isAllValid) {
    resolve({ isValid: isAllValid, msg: '' });
  } else {
    reject({ isValid: isAllValid, msg });
  }
  rel.isValid = isAllValid;

  return rel;
}

export function isFormField(type) {
  switch (type) {
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
