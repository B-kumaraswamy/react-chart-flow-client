import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ClipLoader } from "react-spinners";

function App() {
  return (
    <div className="app-container" style={{ 
      backgroundColor: 'rgb(17, 17, 17)', 
      color: 'rgb(243, 244, 246)',
      minHeight: '100vh'
    }}>
      <div className="pipeline-toolbar">
        <PipelineToolbar />
      </div>
      <PipelineUI />
      <div className="submit-container">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;