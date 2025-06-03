import { BaseNode } from '../components/BaseNode';
import { NODE_CONFIGS } from '../config/nodeConfigs';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      config={NODE_CONFIGS.filter}
    />
  );
};