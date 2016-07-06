import update from 'react-addons-update';
import {
  validate
} from './validation';

// One Value , One Message And Three Status
//
// One Value: field value
// One Message: Error Message
// Three Status: dirty, valid, pending

class Formata {
  constructor(data = {}) {
    this.data = data;
    this.last = this.data;
    this.validations = {};
  }

  initField(name) {
    if (!this.data[name]) {
      this.data[name] = {
        value: '',
        isValid: true,
        msg: '',
      };
    }
    return this.data[name];
  }

  updateFormata() {
    return new Formata(this.last);
  }

  getField(name) {
    return this.data[name] || this.initField(name);
  }

  setField(name, value) {
    this.last = update(this.last, {
      [name]: {
        $merge: value,
      },
    });
    return this.updateFormata();
  }

  setValue(name, value) {
    return this.setField(name, { value });
  }

  getValue(name) {
    return this.getField(name).value;
  }

  getLastValue(name) {
    return this.last[name].value;
  }

  resetStatus(name) {
    return this.setField(name, {
      isValid: true,
      msg: '',
    });
  }

  getFields() {
    if (!this.fields) {
      this.fields = Object.keys(this.data);
    }
    return this.fields;
  }

  setValidations(name, validations = []) {
    this.validations[name] = validations;
  }

  getValidations(name) {
    return this.validations[name];
  }

  validate(name, validations){
    return validate(this.getLastValue(name), validations)
      .then(vResult => {
        const vRel = { isValid: true, msg: '' };
        this.setField(name, vRel); 
        return vRel;
      })
      .catch(vResult => {
        this.setField(name, vResult);
        return Promise.reject(vResult);
      });
  }

  runValidation(name) {
    return this.validate(name, this.getValidations(name));
  }
}

export default Formata;
