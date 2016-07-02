import React, { Component } from 'react';
import KForm from 'src/index';
import update from 'react-addons-update';

const validator = {
  isNotEmpty: v => !!v.trim().length,
  isFit: v => /^[\w0-9]{8,16}$/.test(v),
};

const validation = {
  username: [
    {
      f: validator.isNotEmpty,
      msg: 'username should not be empty.',
    },
    {
      f: validator.isFit,
      msg: 'username should consist of letter, number or underline.',
    }
  ],
  password: [
    {
      f: validator.isNotEmpty,
      msg: 'password should not be empty.',
    },
    {
      f: validator.isFit,
      msg: 'username should consist of letter, number or underline.',
    }
  ],
};

export default class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: {},
        password: {},
        confirmPassword: {},
      },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  onSubmit(e, data) {
    alert(JSON.stringify(data));
  }

  onFormChange(form) {
    this.setState({
      form,
    });
  }

  render() {
    return (
      <KForm
        onSubmit={this.onSubmit}
        value={this.state.form}
        onFormChange={this.onFormChange}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            validations={validation.username}
          />
          {this.state.form.username.msg || ''}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            validations={[
              ...validation.password,
              {
                f: v => {
                  if (this.state.form.confirmPassword.value === v) {
                    return true;
                  } else {
                    this.setState({
                      form: update(this.state.form, {
                        confirmPassword: {
                          $merge: {
                            isValid: false,
                            msg: 'doesnt same',
                          },
                        }
                      }),
                    });
                  }
                },
              }
            ]}
          />
          {this.state.form.password.msg || ''}
        </div>
        <div>
          <label htmlFor="confirmPassword">ConfirmPassword: </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            validations={[
              {
                f: v => this.state.form.password.value === v,
                msg: 'is not equal with password.',
              }
            ]}
          />
          {this.state.form.confirmPassword.msg || ''}
        </div>
        <button type="submit">submit</button>
      </KForm>
    );
  }
}
