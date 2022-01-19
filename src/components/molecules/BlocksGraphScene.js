import React from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    removeElements
} from "react-flow-renderer";

const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
};

const GraphScene = props => {
    const onElementsRemove = (elementsToRemove) =>
        props.setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => props.setElements((els) => addEdge(params, els));

    return (
        <ReactFlowProvider>
            <ReactFlow
                elements={props.elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onLoad={onLoad}
                snapToGrid={false}
                defaultZoom={-10}
            >
                <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.style?.background) return n.style.background;
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'output') return '#ff0072';
                        if (n.type === 'default') return '#1a192b';

                        return '#eee';
                    }}
                    nodeColor={(n) => {
                        if (n.style?.background) return n.style.background;

                        return '#fff';
                    }}
                    nodeBorderRadius={2}
                />
                <Background color="#aaa" gap={20} />
            </ReactFlow>
        </ReactFlowProvider>
    );
};

export default GraphScene;
