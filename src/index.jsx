import React, { PropTypes, Component, Children } from 'react';
import update from 'react-addons-update';
import {
  validate,
  isFormField,
} from './utils';

const propTypes = {
  value: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
};

class KForm extends Component {
  constructor(props) {
    super(props);
    this.rerenderChildren = this.rerenderChildren.bind(this);
    this.setStore = this.setStore.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.fields = {};
    this.value = this.props.value;
  }

  onBlur(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setFieldValue(name, value);

    // Validate

    // const validations = this.fields[name].props.validations;
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setFieldValue(name, value);

    // Validate

    const validations = this.fields[name].props.validations;

    if (validations) {
      // debounce
      validate(validations, value, {
        resolve: rel => {
          // sync ture
          this.setFieldValidation(name, rel);
        },
        reject: rel => {
          // sync/async false
          this.setFieldValidation(name, rel);
        },
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const names = Object.keys(this.value);

    // 1. isValid: check every field

    const isValid = names.every(name => (
      typeof this.value[name].isValid === 'undefined' || this.value[name].isValid
    ));

    // 1.1. false -> doNothing

    if (!isValid) return;

    // 2. validate: every field

    const fieldsIsValid = names.every(name => (
      this.validate(name, this.value[name].value)
    ));

    // 2.1. false -> doNothing

    if (!fieldsIsValid) return;

    // 3. props.onSubmit
    this.props.onSubmit(e, this.value);
  }

  setStore(store) {
    this.value = update(this.value, store);
    this.props.onFormChange(this.value);
  }

  setFieldValue(name, value) {
    this.setStore({
      [name]: {
        value: {
          $set: value,
        },
      },
    });
  }

  setFieldValidation(name, validation) {
    this.setStore({
      [name]: {
        $merge: validation,
      },
    });
  }

  rerenderChildren(children) {
    return Children.map(children, (child) => {
      let props = {};
      if (isFormField(child)) {
        props = {
          key: child.props.name,
          value: this.props.value[child.props.name] &&
            this.props.value[child.props.name].value || '',
        };
        this.fields[props.key] = child;
        if (!this.value[props.key]) this.value[props.key] = {};
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

  render() {
    return (
      <form
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onSubmit={this.onSubmit}
      >
        {this.rerenderChildren(this.props.children)}
      </form>
    );
  }
}

KForm.propTypes = propTypes;

export default KForm;
