import React, { Component, PropTypes } from 'react';
import KForm from '../';
import 'expose?Perf!react-addons-perf';

class Simple extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      form: {
      },
    };
    this.onFormStateChange = this.onFormStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e, data) {
  }

  render() {
    return (
      <KForm
        onFormChange={this.onFormStateChange}
        value={this.state.form}
        onSubmit={this.onSubmit}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            validations={[
              {
                f: v => v.trim().length > 0,
                msg: '不能为空',
              },
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
          <span>{this.state.form.username && this.state.form.username.msg || ''}</span>
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
