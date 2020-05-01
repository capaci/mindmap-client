import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Row, Layout } from 'antd';

import './Home.css'
import axios from '../config/axios';

import AppHeader from '../components/AppHeader';
import MindmapDrawer from '../components/MindmapDrawer';

const { Content, Footer } = Layout;

const App = () => {
  const [mindmaps, setMindmaps] = useState([]);
  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const token = localStorage.getItem('auth-token');
  if (!token) {
    history.push('/login');
  }

  const handleCardClick = (id) => (e) => {
    e.preventDefault()
    history.push(`mindmaps/${id}`);
  }

  const hideDrawer = ({ event = '', mindmap }) => {
    console.log({ event, mindmap })
    if (event === 'created') {
      setMindmaps([...mindmaps, mindmap])
    }
    setVisible(false);
  }

  const getMindmaps = () => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/mindmaps');
        setMindmaps(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  useEffect(getMindmaps, [])

  return (
    <Layout>

      <AppHeader></AppHeader>

      <MindmapDrawer visible={visible} onClose={hideDrawer}></MindmapDrawer>

      <Content style={{ paddingTop: '50px', minHeight: 'calc(100vh - 133px)' }}>
        <Row align="middle" justify="center" type="flex">
          <Col span={16}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Row gutter={[10, 10]}>
                  {
                    mindmaps.map((mindmap) => (
                      <Col span={6} key={mindmap.id}>
                        <Card hoverable bordered={false} style={{ borderRadius: '10px', background: mindmap.nodes[0].background_color || '#5f5', height: '150px' }} onClick={handleCardClick(mindmap.id)}>
                          <Card.Meta
                            title={mindmap.title}
                            description={mindmap.description}
                          />
                        </Card>
                      </Col>
                    ))
                  }
                  < Col span={6}>
                    <Card hoverable bordered={false} style={{ borderRadius: '10px', background: '#dedede', height: '150px' }} onClick={() => setVisible(true)}>
                      <Card.Meta
                        title="+"
                        description="Create mindmap"
                        style={{ display: "flex", direction: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "#fff !important" }}
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
