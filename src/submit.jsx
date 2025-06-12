// submit.js
'use client';
import { useStore } from './store';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { PipelineResultsDialog } from './pipeLineResults';

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const transformFlowData = (nodes, edges) => {
    return {
      num_nodes: nodes.length,
      num_edges: edges.length,
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      }))
    };
  };

  const handleSubmit = async () => {
    console.log({
      num_nodes: nodes.length,
      num_edges: edges.length,
      nodes: nodes,
      edges: edges
    });
    
    setIsLoading(true);
    setDialogOpen(true); // Open dialog when submit is clicked
    
    try {
      const payload = transformFlowData(nodes, edges);
     
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/pipelines/parse,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setData({ error: 'Failed to analyze pipeline' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div style={{
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      backgroundColor: 'rgb(17, 17, 17)',
      borderTop: '1px solid rgb(55, 65, 81)'
    }}>
      <PipelineResultsDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        results={data}
        isLoading={isLoading}
      >
        <button 
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="
            relative
            flex 
            items-center 
            justify-center 
            gap-2
            bg-blue-600 
            hover:bg-blue-700 
            disabled:bg-blue-400
            disabled:cursor-not-allowed
            text-white 
            font-semibold 
            py-3 
            px-6 
            rounded-lg 
            transition-all 
            duration-200
            min-w-[160px]
          "
        >
          <span className={`transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            Submit Pipeline
          </span>
          
          {isLoading && (
            <div className="flex items-center justify-center">
              <ClipLoader
                color="#ffffff"
                loading={isLoading}
                cssOverride={{}}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </button>
      </PipelineResultsDialog>
    </div>
  );
};