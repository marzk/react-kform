import React, { PropTypes, Component, Children } from 'react';
import update from 'react-addons-update';
import {
  promisyValidation,
  isFormField,
  compareValidation,
} from './utils';

const propTypes = {
  value: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

class KForm extends Component {
  constructor(props) {
    super(props);
    this.rerenderChildren = this.rerenderChildren.bind(this);
    this.setStore = this.setStore.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.fields = {};
    this.value = this.props.value;
  }

  onBlur() {
    // emit a blur event
    // emit e.target validation
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    // emit a change event

    this.setFieldValue(name, value);
    this.validate(name, value);
  }

  setStore(store) {
    this.value = update(this.value, store);
    this.props.onFormChange(this.value);
  }

  setFieldValue(name, value) {
    this.setStore({
      value: {
        $merge: {
          [name]: value,
        },
      },
    });
  }

  setFieldValidation(name, validation) {
    this.setStore({
      validation: {
        $merge: {
          [name]: validation,
        },
      },
    });
  }

  rerenderChildren(children) {
    return Children.map(children, (child) => {
      let props = {};
      if (isFormField(child)) {
        props = {
          key: child.props.name,
          value: this.props.value.value[child.props.name] || '',
        };
        this.fields[props.key] = child;
      }

      let relChild;

      if (Children.count(child) && typeof child !== 'string') {
        relChild = React.cloneElement(
          child,
          props,
          this.rerenderChildren(child.props.children)
        );
      } else if (React.isValidElement(child)) {
        relChild = React.cloneElement(
          child,
          props
        );
      } else {
        relChild = child;
      }
      return relChild;
    });
  }

  validate(name, value) {
    const validations = this.fields[name].props.validations;
    if (validations) {
      const promisy = promisyValidation.bind(null, value);

      // 置为有效
      const rel = { isValid: true, msg: '' };
      if (!compareValidation(this.value.validation[name], rel)) {
        this.setFieldValidation(name, rel);
      }
      Promise.all(validations.map(promisy))
        .catch((result) => {
          if (!compareValidation(this.value.validation[name], result)) {
            this.setFieldValidation(name, result);
          }
        });
    }
  }

  render() {
    return (
      <form
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
      >
        {this.rerenderChildren(this.props.children)}
      </form>
    );
  }
}

KForm.propTypes = propTypes;

export default KForm;
