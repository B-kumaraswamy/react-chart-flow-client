import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import { FilterNode } from './nodes/filterNode';
import { MathNode } from './nodes/mathNode';
import { ConditionNode } from './nodes/conditionNode';
import { ApiNode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';

// Import custom TurboEdge
import TurboEdge from './components/TurboEdge';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all 9 node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  math: MathNode,
  condition: ConditionNode,
  api: ApiNode,
  database: DatabaseNode,
};

// Custom edge types
const edgeTypes = {
  turbo: TurboEdge,
};

// Default edge options with gradient
const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);
    const getNodeID = useStore(state => state.getNodeID);
    const addNode = useStore(state => state.addNode);
    const onNodesChange = useStore(state => state.onNodesChange);
    const onEdgesChange = useStore(state => state.onEdgesChange);
    const onConnect = useStore(state => state.onConnect);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{width: '100%', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Background 
                  variant="dots"
                  color="rgb(75, 85, 99)" 
                  gap={gridSize} 
                  size={2}
                  style={{ backgroundColor: 'rgb(17, 17, 17)' }}
                />
                <Controls showInteractive={false} />
                <MiniMap 
                  style={{
                    backgroundColor: 'rgb(31, 41, 55)',
                    border: '1px solid rgb(55, 65, 81)'
                  }}
                  maskColor="rgba(17, 17, 17, 0.8)"
                />
                
                {/* SVG Definitions for Gradients */}
                <svg style={{ position: 'absolute', top: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="edge-gradient">
                      <stop offset="0%" stopColor="#ae53ba" />
                      <stop offset="100%" stopColor="#2a8af6" />
                    </linearGradient>
                    <marker 
                      id="edge-circle" 
                      viewBox="-5 -5 10 10" 
                      refX="0" 
                      refY="0" 
                      markerUnits="strokeWidth" 
                      markerWidth="10" 
                      markerHeight="10" 
                      orient="auto"
                    >
                      <circle 
                        stroke="#2a8af6" 
                        strokeOpacity="0.75" 
                        r="2" 
                        cx="0" 
                        cy="0" 
                      />
                    </marker>
                  </defs>
                </svg>
            </ReactFlow>
        </div>
    )
}