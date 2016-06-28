import React, { Component, PropTypes } from 'react';
import KForm from '../';

class Simple extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      form: {
        value: {},
        validation: {},
      },
    };
    this.onFormStateChange = this.onFormStateChange.bind(this);
  }

  render() {
    return (
      <KForm
        onFormChange={this.onFormStateChange}
        value={this.state.form}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            validations={[
              {
                f: (v) => /^\w+$/.test(v),
                msg: '不合规矩',
              },
              {
                f: (v) => {
                  return new Promise(function (resolve) {
                    setTimeout(() => {
                      resolve({
                        isValid: false,
                        msg: '666',
                      });
                    }, 2000);
                  });
                },
              }
            ]}
          />
          <span>{this.state.form.validation.username && this.state.form.validation.username.msg || ''}</span>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="text"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </KForm>
    );
  }

  onFormStateChange(form) {
    this.setState({ form });
  }
}

export default Simple;
