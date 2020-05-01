import React, { useEffect, useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import { SketchPicker } from 'react-color'
import axios from '../config/axios'

const MindmapDrawer = ({ visible, onClose, form }) => {
    const { getFieldDecorator } = form;
    let [mindmap, setMindmap] = useState({ title: '' })

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields(async (err, { title }) => {
            console.log({err, title})
            if (err) return;
            let { data } = await axios.post('mindmaps/', { title });
            console.log({data})
            onClose({ event: 'created', mindmap: data.mindmap });
        });
    };

    return (
        <div>
            <Drawer
                title="Create Mindmap"
                width={500}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form layout="vertical" onSubmit={handleSubmit}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Title">
                                {getFieldDecorator('title', {
                                    rules: [{ required: false, message: 'Please enter mindmap title' }],
                                    initialValue: mindmap.title
                                })(<Input placeholder="Please enter mindmap title" />)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </div>
    );
}

export default Form.create({ name: 'NodeForm' })(MindmapDrawer)
