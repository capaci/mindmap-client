import React, { useEffect, useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import { SketchPicker } from 'react-color'
import axios from '../config/axios'

const NodeDrawer = ({ mindmapId, node = { id: '', title: '', description: '', background_color: '#000' }, visible, onClose, form }) => {
    const { getFieldDecorator } = form;
    const [editing, setEditing] = useState(!!node.id);
    let [showColorPicker, setShowColorPicker] = useState(false)
    let [editingNode, setEditingNode] = useState(node)

    useEffect(() => {
        setEditingNode(node);
        setEditing(!!node.id);
    }, [node])
  

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields(async (err, { title, description }) => {
            if (err) return;
            if (editing) {
                const endpoint = `mindmaps/${mindmapId}/nodes/${editingNode.id}`;
                let { data } = await axios.put(endpoint, { title, description, background_color: editingNode.background_color });
                onClose({ event: 'updated', node: data.node });
            } else {
                const endpoint = `mindmaps/${mindmapId}/nodes`;
                let { data } = await axios.post(endpoint, { title, description, background_color: editingNode.background_color });
                onClose({ event: 'created', node: data.node });
            }
        });
    };

    const changeColorHandler = (color) => {
        setEditingNode({...editingNode, background_color: color.hex})
    }

    const openColorPicker = () => {
        setShowColorPicker(true)
    }

    const closeColorPicker = () => {
        setShowColorPicker(false)
    }

    const styles = {
        color: {
            width: '36px',
            height: '36px',
            borderRadius: '2px',
            background: editingNode.background_color,
        },
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    }

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
                                    initialValue: editingNode.title
                                })(<Input placeholder="Please enter user title" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Color">
                                <div style={styles.swatch} onClick={openColorPicker}>
                                    <div style={styles.color} />
                                </div>
                                {showColorPicker ? <div style={styles.popover}>
                                    <div style={styles.cover} onClick={closeColorPicker} />
                                    <SketchPicker
                                        color={editingNode.background_color}
                                        onChange={changeColorHandler}
                                        disableAlpha={true}
                                        presetColors={[
                                            '#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#dfe6e9',
                                            '#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#b2bec3',
                                            '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#636e72',
                                            '#fdcb6e', '#e17055', '#d63031', '#e84393', '#2d3436'
                                        ]}
                                    />
                                </div> : null}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Description">
                                {getFieldDecorator('description', {
                                    initialValue: editingNode.description
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
