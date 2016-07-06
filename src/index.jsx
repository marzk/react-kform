import React, { PropTypes, Component, Children } from 'react';
import update from 'react-addons-update';
import {
  isFormField,
  debounce,
} from './utils';
import Formata from './formata';

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
    this.setStateChange = this.setStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.validate = debounce(this.validate, 200).bind(this);
  }

  onFocus(e) {
    const name = e.target.name;
    if (!isFormField(e.target.tagName.toLowerCase())) return;

    // when focus, reset the formata status 
    this.setStateChange(this.props.value.resetStatus(name));
  }

  onBlur(e) {
    if (!isFormField(e.target.tagName.toLowerCase())) return;
    const name = e.target.name;
    const value = e.target.value;

    this.validate(name);
    // Validate
    // const validations = this.fields[name].props.validations;
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setFieldValue(name, value);

    // Validate

    // debounce
    this.validate(name);
  }

  onSubmit(e) {
    e.preventDefault();
    const formata = this.props.value;

    // 1. isValid: check every field

    const isValid = formata.isAllValid();

    // 1.1. false -> doNothing

    if (!isValid) return;

    // 2. validate: every field

    formata.validateAll()
      .then((rel) => {
        this.props.onSubmit(e, formata.getFormData());
        this.updateFieldValidation()
      })
      .catch(this.updateFieldValidation.bind(this));

    // 2.1. false -> doNothing

    // 3. props.onSubmit
  }

  validate(name) {
    this.props.value.runValidation(name)
      .then(rel => {
        this.updateFieldValidation(name);
      }).catch(rel => {
        this.updateFieldValidation(name);
      });
  }



  setStateChange(data) {
    this.props.onFormChange(data);
  }

  setFieldValue(name, value) {
    this.setStateChange(this.props.value.setValue(name, value));
  }

  updateFieldValidation() {
    this.setStateChange(this.props.value.updateFormata());
  }

  rerenderChildren(children) {
    return Children.map(children, (child) => {
      let props = {};
      if (isFormField(child.type)) {
        const name = child.props.name;
        props = {
          key: name,
          value: this.props.value.getValue(name),
        };
        this.props.value.setValidations(name, child.props.validations);
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
        onFocus={this.onFocus}
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

export { Formata };
