import React from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import axios from '../config/axios'

const NodeDrawer = ({ mindmapId, node = { id: '', title: '', description: '', background_color: '' }, visible, onClose, form }) => {
    const { getFieldDecorator } = form;
    const editing = !!node.id;

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields(async (err, { title, description, background_color }) => {
            if (err) return;
            if (editing) {
                const endpoint = `mindmaps/${mindmapId}/nodes/${node.id}`;
                let { data } = await axios.put(endpoint, { title, description, background_color });
                onClose({event: 'updated', node: data.node });
            } else {
                const endpoint = `mindmaps/${mindmapId}/nodes`;
                let { data } = await axios.post(endpoint, { title, description, background_color });
                onClose({event: 'created', node: data.node });
            }
        });
    };

    return (
        <div>
            <Drawer
                title={editing ? 'Edit item' : 'Create'}
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
                                    rules: [{ required: false, message: 'Please enter item title' }],
                                    initialValue: node.title
                                })(<Input placeholder="Please enter user title" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Color">
                                {getFieldDecorator('background_color', {
                                    rules: [{ required: false, message: 'Please enter item color' }],
                                    initialValue: node.background_color
                                })(<Input placeholder="Please enter item color" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Description">
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'please enter url description' }],
                                    initialValue: node.description
                                })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
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

export default Form.create({ name: 'NodeForm' })(NodeDrawer)
