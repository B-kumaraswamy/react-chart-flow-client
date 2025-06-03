import { BaseNode } from '../components/BaseNode';
import { NODE_CONFIGS } from '../config/nodeConfigs';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode 
      id={id} 
      data={data} 
      config={NODE_CONFIGS.llm} 
    />
  );
};