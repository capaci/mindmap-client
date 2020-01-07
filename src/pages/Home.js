import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Layout, Menu, Icon } from 'antd';
import { useHistory } from 'react-router-dom';
import logo from '../logo.svg';

import './Home.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const history = useHistory();

  const token = localStorage.getItem('auth-token');
  if (!token) {
    history.push('/login');
  }
  
  const handleCardClick = (route) => (e) => {
    e.preventDefault()
    history.push(route);
  }

  return (
    <Layout>
      <Header className="App-header">
        <div className="logo">
          {/* <img src={logo} alt="logo" /> */}
          MindMap
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ paddingTop: '50px', minHeight: 'calc(100vh - 133px)' }}>
        <Row align="middle" justify="center" type="flex">
          <Col span={16}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <Menu.Item key="1">
                    <Icon type="deployment-unit" />
                    Mindmaps
                  </Menu.Item>
                  {/* <Menu.ItemGroup key="group-team" title="Teams">
                    <SubMenu
                      key="team1"
                      title={
                        <span>
                          <Icon type="team" />
                          Team 1
                      </span>
                      }
                    >
                      <Menu.Item key="1">option1</Menu.Item>
                      <Menu.Item key="2">option2</Menu.Item>
                      <Menu.Item key="3">option3</Menu.Item>
                      <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>

                    <SubMenu
                      key="team2"
                      title={
                        <span>
                          <Icon type="team" />
                          Team 2
                      </span>
                      }
                    >
                      <Menu.Item key="5">option1</Menu.Item>
                      <Menu.Item key="6">option2</Menu.Item>
                      <Menu.Item key="7">option3</Menu.Item>
                      <Menu.Item key="8">option4</Menu.Item>
                    </SubMenu>
                  </Menu.ItemGroup> */}
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>

                <Row gutter={[10, 10]}>
                  <Col span={6}>
                    <Card hoverable bordered={false} style={{ borderRadius: '10px', background: '#f55', height: '150px' }} onClick={handleCardClick('/mindmap1')}>
                      <Card.Meta
                        title="Mindmap 1"
                        description="Card description"
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card hoverable bordered={false} style={{ borderRadius: '10px', background: '#5f5', height: '150px' }} onClick={handleCardClick('/mindmap2')}>
                      <Card.Meta
                        title="Mindmap 2"
                        description="Card description"
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card hoverable bordered={false} style={{ borderRadius: '10px', background: '#55f', height: '150px' }} onClick={handleCardClick('/mindmap3')}>
                      <Card.Meta
                        title="Mindmap 3"
                        description="Card description"
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card hoverable bordered={false} style={{ borderRadius: '10px', background: '#f55', height: '150px' }} onClick={handleCardClick('/mindmap4')}>
                      <Card.Meta
                        title="Mindmap 4"
                        description="Card description"
                      />
                    </Card>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Mindmap ©2020 Created by Rafael Capaci</Footer>


    </Layout>
  );
}

export default App;
