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

- [ ] Process dirty code for input field

## Data Stucture

```
{

  value: {
    username: String,
    password: String,
    phone: String,
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

## Form State

```
{
  value: {
    oldpass: String,
  },
  fields: {
    oldpass: {
      isValid: Boolean,
      msg: String,
    }
  }
}
```

## Validation

```
[{
  validator: Boolean Function || True Promise,
  msg: String,
}]
```

## Flow

```
ACTION input[name] => VALIDATION input[name].value => STATE value
ACTION submit => VALIDATE every => VALIDATION every => GET state =>  onSubmit
```
