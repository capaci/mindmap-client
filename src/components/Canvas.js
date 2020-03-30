import React, { useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { Spring, animated } from 'react-spring/renderprops-konva';

import NodeDrawer from './NodeDrawer';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight-45;

const MAIN_NODE_CX = 50;
const MAIN_NODE_CY = 50;
const MAIN_NODE_DIAMETER = 600;

const CENTER_NODE_CX = CANVAS_WIDTH / 2;
const CENTER_NODE_CY = CANVAS_HEIGHT / 2;
const CENTER_NODE_DIAMETER = 300;

const CHILDREN_NODE_DIAMETER = 150;
const CHILDREN_DISPLACEMENT = 300;

const radianAux = Math.PI / 180

const configs = {
    main: {
        height: MAIN_NODE_DIAMETER,
        width: MAIN_NODE_DIAMETER,
        x: MAIN_NODE_CX,
        y: MAIN_NODE_CY,
        align: 'left',
        fontSize: 26,
        textX: 0,
        textY: 0,
        textHeight: (MAIN_NODE_DIAMETER / 2) + MAIN_NODE_CY,
        textWidth: (MAIN_NODE_DIAMETER / 2) + MAIN_NODE_CX,
        verticalAlign: 'top',
    },
    center: {
        height: CENTER_NODE_DIAMETER,
        width: CENTER_NODE_DIAMETER,
        x: CENTER_NODE_CX,
        y: CENTER_NODE_CY,
        align: 'center',
        fontSize: 18,
        textX: CENTER_NODE_CX - CENTER_NODE_DIAMETER / 2,
        textY: CENTER_NODE_CY - CENTER_NODE_DIAMETER / 2,
        textHeight: CENTER_NODE_DIAMETER,
        textWidth: CENTER_NODE_DIAMETER,
        verticalAlign: 'middle',
    },
    child: {
        height: CHILDREN_NODE_DIAMETER,
        width: CHILDREN_NODE_DIAMETER,
        x: null,
        y: null,
        align: 'center',
        fontSize: 18,
        textX: null,
        textY: null,
        textHeight: CENTER_NODE_DIAMETER,
        textWidth: CENTER_NODE_DIAMETER,
        verticalAlign: 'middle',
    },
    hidden: {
        height: 0,
        width: 0
    },
}

const Node = ({ node, onClick, index, numberOfChildren }) => {
    const handleClick = (e, node) => onClick(node)

    if (node.position === 'hidden') return (<></>)
    const config = {...configs[node.position]}
    if (node.position === 'child') {
        let angle = (360/numberOfChildren)*index*radianAux
        let auxX = CENTER_NODE_CX + CHILDREN_DISPLACEMENT * Math.cos(angle)
        let auxY = CENTER_NODE_CY + CHILDREN_DISPLACEMENT * Math.sin(angle)
        config.x = auxX
        config.y = auxY
        config.textX = auxX - CHILDREN_NODE_DIAMETER
        config.textY = auxY - CHILDREN_NODE_DIAMETER
    }

    return (
        <Spring
            key={node.id}
            native
            from={{ width: 0, height: 0 }}
            to={{
                fill: node.background_color || 'seagreen',
                ...config
            }}
        >
            {({ align, fill, fontSize, height, verticalAlign, textHeight, textWidth, textX, textY, width, x, y }) => {
                const circleProps = { fill, height, width, x, y };
                const textProps = { align, fontSize, height: textHeight, verticalAlign, width: textWidth, x: textX, y: textY };

                return (
                    <Group onClick={(e) => handleClick(e, node)}>
                        <animated.Circle {...circleProps} nodeId={node.id} />
                        <animated.Text text={node.title} padding={20} strokeWidth={900} fill="white" nodeId={node.id} {...textProps} />
                    </Group>
                )
            }}
        </Spring>
    );
}

const Canvas = ({ mindmap, height = window.innerHeight-45, width = window.innerWidth }) => {
    const getRootNode = mindmap => mindmap && mindmap.nodes ? mindmap.nodes.find(child => !child.parent_id) : {};
    const getNodeChildren = node => mindmap && mindmap.nodes ? mindmap.nodes.filter(child => child.parent_id === node.id) : [];
    const getHiddenChildren = (showedNodesIds) => mindmap.nodes.filter(child => !showedNodesIds.includes(child.id));

    const root = { ...getRootNode(mindmap), position: 'center' };
    const children = getNodeChildren(root).map(node => { return { ...node, position: 'child' } });
    const hidden = getHiddenChildren([root.id, ...(children.map(c => c.id))]).map(node => { return { ...node, position: 'hidden' } });
    const [visible, setVisible] = useState(false);
    const [selectedNode, setSelectedNode] = useState({});

    const [nodes, setNodes] = useState([root, ...children, ...hidden]);

    const hideDrawer = ({ event='', node }) => {
        console.log({ event, node })
        if (event === 'created') {
            setNodes([...nodes, node])
        } else if (event === 'updated') {
            let index = nodes.findIndex(n => n.id === node.id)
            console.log(index)
            nodes[index] = { ...node }
            setNodes(nodes)
        }
        setVisible(false);
    }

    const handleNodeClick = (node) => {
        if (node.position === 'center') {
            setSelectedNode(node)
            setVisible(true)
        } else {
            let res = nodes.map(n => {
                n.position = 'hidden'
                if (n.id === node.id) {
                    n.position = 'center'
                }
                if (n.id === node.parent_id) {
                    n.position = 'main'
                }
                if (n.parent_id === node.id) {
                    n.position = 'child'
                }
                return n
            })
            setNodes(res)
        }
    }

    return (
        <div>
            <NodeDrawer mindmapId={mindmap.id} node={selectedNode} visible={visible} onClose={hideDrawer}></NodeDrawer>

            <Stage width={width} height={height}>
                <Layer>
                    {
                        nodes.map(node => {
                            let siblings = nodes.filter(n => n.parent_id === node.parent_id)
                            let indexOf = siblings.findIndex(s => s.id === node.id)
                            return (
                                <Node node={node} onClick={handleNodeClick} index={indexOf} numberOfChildren={siblings.length} key={node.id} />
                            )
                        })
                    }
                </Layer>
            </Stage>

        </div>
    );
}

export default Canvas;
