# React KForm

A Form Component to reduce dirty code for React.

## Short Introduction

You dont need to care about sync/async validating and error messages, you dont need to care about the dirty code for every field, you dont need to care about submitting. All you care about is the state, and you should only get everything you need from it.

## Features

* only Form component
* no state, it relies on the props
* async or sync validator
* error message

## Roadmap

- [x] dirty code for input field
- [x] dirty code for onChange
- [x] dirty code for onBlur
- [x] onSubmit
- [ ] dirty
- [ ] test cases and examples
- [ ] dirty code for other field
- [ ] this.value & this.props.value sync problem

## Data Stucture & Form State

```
{
  username: {
    value: String,
    isValid: Boolean,
    msg: String,
  },
}
```

## Examples

```jsx
import React, { Component } from 'react';
import Form from 'react-kform';

class EditPassword from Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }

  onFormStateChange(form) {
    this.setState({ form });
  }

  onFormSubmit(e, isValid) {
    // this.state.form.value
  }

  render() {
    return (
      <Form onChange={onFormStateChange} onSubmit={onFormSubmit}>
        <div>
          <label for="oldpass">OldPassword:</label>
          <input name="oldpass" type="password" id="oldpass" />
          <Form.Error
            name="oldpass"
            type="onChange"
            validation={oldPassValidation}
          >{this.state.fields.oldpass.msg}</Form.Error>
          <Form.Error name="oldpass" type="onBlur" validation={oldPassValidation}>{this.state.fields.oldpass.msg}</Form.Error>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    );
  }
}

export default EditPassword;
```

## Validation

```
[{
  validator: Boolean Function || Promise Function,
  msg: String,
}]
```
