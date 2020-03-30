import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const height = '45px';

const AppHeader = () => {
  return (
    <Header className="App-header" style={{ height }}>
      <div className="logo" style={{ height, lineHeight: height }}>
        {/* <img src={logo} alt="logo" /> */}
        MindMap
        </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ height, lineHeight: height }}
      >
        <Menu.Item key="1">Visualização geral</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>

  );
}

export default AppHeader;