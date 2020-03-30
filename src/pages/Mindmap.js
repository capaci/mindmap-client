import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../config/axios'
import { Layout, Menu } from 'antd';
// import { useHistory } from 'react-router-dom';


import AppHeader from '../components/AppHeader';
// import AppSubHeader from '../components/AppSubHeader';
import Canvas from '../components/Canvas';

const { Content, Footer } = Layout;
// const { SubMenu } = Menu;

const Node = ({ node, height = '100px', width = '100px', onClickHandler }) => {
    return (
        <div style={{ height, width, backgroundColor: node.background_color || 'red', cursor: onClickHandler ? 'pointer' : 'auto' }} onClick={onClickHandler}>
            {node.id} - {node.title}
        </div>
    );
}

const Mindmap = (props) => {
    const [mindmap, setMindmap] = useState({});

    const { id } = useParams();

    const getMindmapData = () => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/mindmaps/${id}`);
                setMindmap(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }

    useEffect(getMindmapData, [id]);

    return (
        <Layout>

            <AppHeader></AppHeader>
            {/* <AppSubHeader title={mindmap.title}></AppSubHeader> */}

            <Content style={{ minHeight: 'calc(100vh - 133px)' }}>
                {mindmap.nodes &&
                    <Canvas mindmap={mindmap}></Canvas>
                }
            </Content>
            <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>Mindmap ©2020 Created by <a href="https://capaci.dev" target="blank">Rafael Capaci</a></Footer>


        </Layout>
    );

}

export default Mindmap;
