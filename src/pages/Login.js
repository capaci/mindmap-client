import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'antd';

import LoginForm from '../components/LoginForm'
import './Login.css'

const Login = () => {
  return (
    <Row align="middle" justify="center" style={{ height: "100vh" }} type="flex">
      <Col>
        <LoginForm></LoginForm>
      </Col>
    </Row>
  );

}

export default Login