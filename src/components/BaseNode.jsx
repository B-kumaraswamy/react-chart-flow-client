import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { X } from 'lucide-react';
import { useStore } from '../store';

// shadcn components
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export const BaseNode = ({ id, data, config, selected }) => {
  const updateNodeField = useStore(state => state.updateNodeField);
  const deleteNode = useStore(state => state.deleteNode);
  
  const [nodeState, setNodeState] = useState(() => {
    const initialState = {};
    if (config.fields) {
      config.fields.forEach(field => {
        initialState[field.name] = data?.[field.name] || field.defaultValue || '';
      });
    }
    return initialState;
  });

  useEffect(() => {
    Object.entries(nodeState).forEach(([fieldName, fieldValue]) => {
      updateNodeField(id, fieldName, fieldValue);
    });
  }, [nodeState, id, updateNodeField]);

  const handleFieldChange = (fieldName, value) => {
    setNodeState(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const renderField = (field) => {
    const value = nodeState[field.name] || '';
    
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="!h-5 !py-0 !px-2 !text-xs !border-gray-600 !bg-gray-800 !text-gray-100 nodrag placeholder:!text-gray-400"
          />
        );
      
      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(newValue) => handleFieldChange(field.name, newValue)}
          >
            <SelectTrigger className="!h-5 !py-0 !px-2 !text-xs !border-gray-600 !bg-gray-800 !text-gray-100 nodrag">
              <SelectValue placeholder={field.placeholder || 'Select...'} className="!text-gray-100" />
            </SelectTrigger>
            <SelectContent className="!bg-gray-800 !border-gray-600">
              {field.options.map(option => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="!text-xs !py-1 !text-gray-100 hover:!bg-gray-700"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="!text-xs !resize-none !min-h-[32px] !py-1 !px-2 !border-gray-600 !bg-gray-800 !text-gray-100 nodrag placeholder:!text-gray-400"
            rows={2}
          />
        );
      
      default:
        return <span className="text-gray-300 text-xs">{value}</span>;
    }
  };

  return (
    <div className={`turbo-node ${selected ? 'selected' : ''}`}>
      {/* Main Node Wrapper */}
          <button
            onClick={handleDelete}
            className="absolute -top-1 -right-1 w-5 h-5 text-white rounded-full flex items-center justify-center opacity-0 transition-opacity duration-200 nodrag turbo-delete-btn"
            style={{ zIndex: 1000 }}
            title="Delete node"
          >
            <X size={10} />
          </button>
      <div className="wrapper gradient">
        <div className="inner">
          {/* Delete Button */}

          {/* Node Content */}
          <div className="body">
            {/* Header */}
            <div className="title-section">
              <div className="title">{config.label}</div>
            </div>

            {/* Fields */}
            <div className="fields">
              {config.fields ? (
                config.fields.map((field, index) => (
                  <div key={field.name} className="field-group">
                    {field.label && (
                      <label className="field-label">
                        {field.label}:
                      </label>
                    )}
                    {renderField(field)}
                  </div>
                ))
              ) : (
                <span className="content-text">{config.content}</span>
              )}
            </div>
          </div>

          {/* Handles */}
          {config.handles.map((handle, index) => (
            <Handle
              key={`${handle.type}-${handle.position}-${index}`}
              type={handle.type}
              position={Position[handle.position]}
              id={handle.id || `${id}-${handle.type}-${index}`}
              style={handle.style || {}}
              className="turbo-handle"
            />
          ))}
        </div>
      </div>
    </div>
  );
};