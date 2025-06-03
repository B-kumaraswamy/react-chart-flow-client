import { BaseNode } from '../components/BaseNode';
import { NODE_CONFIGS } from '../config/nodeConfigs';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode 
      id={id} 
      data={data} 
      config={NODE_CONFIGS.customOutput} 
    />
  );
};