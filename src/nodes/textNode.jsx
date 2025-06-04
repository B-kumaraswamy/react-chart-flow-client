import { useState, useEffect, useRef, useCallback } from "react";
import React from "react"; // Added for React.Fragment
import { Handle, Position } from "reactflow";
import { X } from "lucide-react";
import { useStore } from "../store";

// Variable detection utility
const extractVariables = (text) => {
  const variableRegex = /\{\{(\w+)\}\}/g;
  const variables = [];
  let match;

  while ((match = variableRegex.exec(text)) !== null) {
    const variableName = match[1];
    if (!variables.includes(variableName)) {
      variables.push(variableName);
    }
  }

  return variables;
};

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);

  const [text, setText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Update store when text changes
  useEffect(() => {
    updateNodeField(id, "text", text);
  }, [text, id, updateNodeField]);

  // Force re-render when variables change to ensure handles are properly registered
  const [forceUpdate, setForceUpdate] = useState(0);

  // Extract variables when text changes - with forced re-render
  useEffect(() => {
    const newVariables = extractVariables(text);
    if (JSON.stringify(newVariables) !== JSON.stringify(variables)) {
      setVariables(newVariables);
      // Force component re-render to ensure ReactFlow registers new handles
      setForceUpdate((prev) => prev + 1);
    }
  }, [text, variables]);

  // Auto-resize textarea - IMPROVED
  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";
      // Set height to scrollHeight with limits
      const newHeight = Math.max(
        40,
        Math.min(textareaRef.current.scrollHeight, 150)
      );
      textareaRef.current.style.height = newHeight + "px";
    }
  }, []);

  // Adjust height when text changes
  useEffect(() => {
    adjustHeight();
  }, [text, adjustHeight]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    // Immediate height adjustment
    setTimeout(adjustHeight, 0);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  // Calculate dynamic node height based on content and variables - FIXED for 40px spacing
  const calculateNodeHeight = () => {
    const baseHeight = 140; // Increased base height
    const variableHeight = Math.max(0, (variables.length - 1) * 40); // Match the 40px spacing
    const textHeight = Math.max(0, (text.split("\n").length - 2) * 20);

    // CRITICAL FIX: Ensure enough space for all handles + padding
    const minHeightForHandles =
      variables.length > 0
        ? 80 + variables.length * 40 + 50 // 50px extra padding at bottom, start at 80px
        : 140;

    const calculatedHeight = Math.max(
      baseHeight + variableHeight + textHeight,
      minHeightForHandles
    );

    return calculatedHeight;
  };

  const nodeHeight = calculateNodeHeight();

  return (
    <div
      className={`turbo-node ${selected ? "selected" : ""}`}
      data-node-type="text"
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute -top-2 -right-2 w-5 h-5 text-white rounded-full flex items-center justify-center opacity-0 transition-opacity duration-200 nodrag turbo-delete-btn"
        style={{ zIndex: 2000 }}
        title="Delete node"
      >
        <X size={12} />
      </button>

      {/* Main Node Wrapper with Dynamic Height */}
      <div
        className="wrapper gradient"
        style={{ minHeight: `${nodeHeight}px` }}
      >
        <div className="inner">
          {/* Variable Handles (Left side) - FIXED positioning and connection */}
          {variables.map((variable, index) => {
            const handleId = `${variable}-input`;
            const topPosition = 80 + index * 40; // INCREASED: More spacing, start lower

            return (
              <React.Fragment key={handleId}>
                {/* Handle */}
                <Handle
                  type="target"
                  position={Position.Left}
                  id={handleId}
                  style={{
                    top: `${topPosition}px`,
                    left: "-6px",
                    backgroundColor: `hsl(${120 + index * 40}, 70%, 50%)`,
                  }}
                  className="custom-handle"
                />

                {/* Variable Label - positioned cleanly to the left */}
                <div
                  style={{
                    position: "absolute",
                    top: `${topPosition - 2}px`, // Align with handle center
                    right: "100%", // Position to the left of the node
                    marginRight: "8px", // Small gap from node edge
                    fontSize: "9px",
                    color: `hsl(${120 + index * 40}, 70%, 70%)`,
                    fontWeight: "600",
                    pointerEvents: "none",
                    backgroundColor: "rgba(0,0,0,0.9)",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: `1px solid hsl(${120 + index * 40}, 70%, 50%)`,
                    whiteSpace: "nowrap",
                    zIndex: 1000,
                    lineHeight: "1",
                  }}
                >
                  {variable}
                </div>
              </React.Fragment>
            );
          })}

          {/* Output Handle (Right side) - POSITIONED DYNAMICALLY */}
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-output`}
            style={{
              right: "-8px",
              top: "50%", // Center on the node
              width: "14px",
              height: "14px",
              backgroundColor: "#3b82f6",
              border: "2px solid #ffffff",
              borderRadius: "50%",
            }}
            className="turbo-handle"
          />

          {/* Node Content */}
          <div className="body">
            {/* Header */}
            <div className="title-section">
              <div className="title">Text</div>
              {variables.length > 0 && (
                <div className="variables-indicator">
                  <span className="text-xs text-blue-400">
                    Variables: {variables.length} (
                    {variables.slice(0, 3).join(", ")}
                    {variables.length > 3 ? "..." : ""})
                  </span>
                </div>
              )}
            </div>

            {/* Textarea */}
            <div className="field-group">
              <label className="field-label">Text:</label>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text with {{variables}}"
                className="simple-auto-textarea nodrag"
                rows={2}
                onWheel={(e) => {
                  const textarea = e.target;
                  if (textarea.scrollHeight <= textarea.clientHeight) {
                    e.preventDefault();
                    return false;
                  }
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>

            {/* Variable indicators in the content area - REMOVED */}
            {/* Clean UI - no handle listing inside node */}
          </div>
        </div>
      </div>
    </div>
  );
};
