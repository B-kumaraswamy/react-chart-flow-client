// Configuration for all 9 node types - WITH BIDIRECTIONAL CONNECTIONS
export const NODE_CONFIGS = {
  // Input nodes - NOW CAN RECEIVE FEEDBACK
  customInput: {
    label: 'Input',
    width: 120,
    height: 140,
    handles: [
      // Forward connections (existing)
      { type: 'source', position: 'Right', id: 'value' },
      // NEW: Backward connections
      { type: 'target', position: 'Left', id: 'feedback' },
    ],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'input_1',
        placeholder: 'Enter input name'
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ]
  },

  // LLM - ALREADY BIDIRECTIONAL, ADDING MORE HANDLES
  llm: {
    label: 'LLM',
    width: 100,
    height: 70,
    handles: [
      // Existing handles
      { type: 'target', position: 'Left', id: 'system', style: { top: '33%' } },
      { type: 'target', position: 'Left', id: 'prompt', style: { top: '67%' } },
      { type: 'source', position: 'Right', id: 'response' },
      // NEW: Additional handles for more flexibility
    ],
    content: 'This is a LLM.'
  },

  // Output nodes - NOW CAN SEND FEEDBACK
  customOutput: {
    label: 'Output',
    width: 120,
    height: 120,
    handles: [
      // Forward connections (existing)
      { type: 'target', position: 'Left', id: 'value' },
      // NEW: Backward connections
      { type: 'source', position: 'Right', id: 'feedback' },
    ],
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'output_1',
        placeholder: 'Enter output name'
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
      }
    ]
  },

  // Text nodes - NOW CAN RECEIVE INPUT
  text: {
    label: 'Text',
    width: 150,
    height: 180,
    handles: [
      // Forward connections (existing)
      { type: 'source', position: 'Right', id: 'output' },
      // NEW: Backward connections
      { type: 'target', position: 'Left', id: 'input' },
    ],
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '{{input}}',
        placeholder: 'Enter text with {{variables}}'
      }
    ]
  },

  // Filter - ALREADY BIDIRECTIONAL, ADDING MORE HANDLES
  filter: {
    label: 'Filter',
    width: 120,
    height: 140,
    handles: [
      // Existing handles
      { type: 'target', position: 'Left', id: 'input' },
      { type: 'source', position: 'Right', id: 'output' },
      // NEW: Additional handles
    ],
    fields: [
      {
        name: 'filterType',
        label: 'Filter Type',
        type: 'select',
        defaultValue: 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'regex', label: 'Regex' }
        ]
      },
      {
        name: 'filterValue',
        label: 'Filter Value',
        type: 'text',
        defaultValue: '',
        placeholder: 'Enter filter criteria'
      }
    ]
  },

  // Math - ALREADY BIDIRECTIONAL, ADDING MORE HANDLES
  math: {
    label: 'Math',
    width: 120,
    height: 90,
    handles: [
      // Existing handles
      { type: 'target', position: 'Left', id: 'valueA', style: { top: '33%' } },
      { type: 'target', position: 'Left', id: 'valueB', style: { top: '67%' } },
      { type: 'source', position: 'Right', id: 'result' },
      // NEW: Additional handles
      { type: 'source', position: 'Bottom', id: 'error' }
    ],
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'add',
        options: [
          { value: 'add', label: 'Add (+)' },
          { value: 'subtract', label: 'Subtract (-)' },
          { value: 'multiply', label: 'Multiply (*)' },
          { value: 'divide', label: 'Divide (/)' }
        ]
      }
    ]
  },

  // Condition - ALREADY BIDIRECTIONAL, ADDING MORE HANDLES
  condition: {
    label: 'Condition',
    width: 120,
    height: 90,
    handles: [
      // Existing handles
      { type: 'target', position: 'Left', id: 'input' },
      { type: 'source', position: 'Right', id: 'true', style: { top: '33%' } },
      { type: 'source', position: 'Right', id: 'false', style: { top: '67%' } },
      // NEW: Additional handles for loops
      { type: 'source', position: 'Bottom', id: 'iteration' }
    ],
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        defaultValue: 'value > 0',
        placeholder: 'Enter condition (e.g., value > 0)'
      }
    ]
  },

  // API - ALREADY BIDIRECTIONAL, ADDING MORE HANDLES
  api: {
    label: 'API',
    width: 120,
    height: 140,
    handles: [
      // Existing handles
      { type: 'target', position: 'Left', id: 'input' },
      { type: 'source', position: 'Right', id: 'response' },
      // NEW: Additional handles
      { type: 'source', position: 'Bottom', id: 'error' }
    ],
    fields: [
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        defaultValue: 'https://api.example.com',
        placeholder: 'Enter API URL'
      },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      }
    ]
  },

  // Database - NOW CAN SEND DATA BACK
  database: {
    label: 'Database',
    width: 160,
    height: 70,
    handles: [
      // Forward connections (existing)
      { type: 'target', position: 'Left', id: 'data' },
      // NEW: Backward connections
      { type: 'source', position: 'Right', id: 'result' },
      { type: 'source', position: 'Top', id: 'status' },
    ],
    fields: [
      {
        name: 'table',
        label: 'Table',
        type: 'text',
        defaultValue: 'users',
        placeholder: 'Enter table name'
      },
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'INSERT',
        options: [
          { value: 'INSERT', label: 'Insert' },
          { value: 'UPDATE', label: 'Update' },
          { value: 'SELECT', label: 'Select' }
        ]
      }
    ]
  }
};