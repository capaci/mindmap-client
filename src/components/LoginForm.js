import React from 'react';
import { useHistory } from "react-router-dom";
import { Form, Icon, Input, Button } from 'antd';

import axios from '../config/axios'

const LoginForm = (props) => {
  const { getFieldDecorator } = props.form;
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, { email, password }) => {
      if (err) return;
      const { data: { token } } = await axios.post('sessions', { email, password })
      localStorage.setItem('auth-token', token);
      history.push('/')
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your email!' }],
          initialValue: 'user@test.me'
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="email"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
          initialValue: 'user'
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="/">
          Forgot password
            </a>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          Log in
            </Button>
        Or <a href="/">register now!</a>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: 'login' })(LoginForm);
