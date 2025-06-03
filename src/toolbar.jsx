// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
          padding: '5px',
          backgroundColor: 'rgb(17, 17, 17)',
          borderBottom: '1px solid rgb(55, 65, 81)'
        }}>
            <h2 style={{ 
              color: 'rgb(243, 244, 246)', 
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Pipeline Components
            </h2>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '12px' 
            }}>
                {/* Original 4 nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                
                {/* New 5 nodes */}
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
            </div>
        </div>
    );
};