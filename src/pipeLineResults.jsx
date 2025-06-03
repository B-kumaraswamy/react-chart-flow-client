// PipelineResultsDialog.js
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PipelineResultsDialog({ 
  children, 
  open, 
  onOpenChange, 
  results, 
  isLoading 
}) {
  
  // Helper function to get display value
  const getDisplayValue = (field) => {
    if (isLoading) return 'Loading...';
    if (!results) return '';
    if (results.error) return 'Error';
    
    switch(field) {
      case 'num_nodes':
        return results.num_nodes?.toString() || '';
      case 'num_edges':
        return results.num_edges?.toString() || '';
      case 'is_dag':
        return results.is_dag !== undefined ? results.is_dag.toString() : '';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="num-nodes">Num_nodes</Label>
            <Input 
              id="num-nodes" 
              name="num_nodes" 
              value={getDisplayValue('num_nodes')}
              readOnly
              className={isLoading ? 'animate-pulse' : ''}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="num-edges">Num_edges</Label>
            <Input 
              id="num-edges" 
              name="num_edges"
              value={getDisplayValue('num_edges')}
              readOnly
              className={isLoading ? 'animate-pulse' : ''}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="is-dag">Is_DAG</Label>
            <Input 
              id="is-dag" 
              name="is_dag"
              value={getDisplayValue('is_dag')}
              readOnly
              className={`${isLoading ? 'animate-pulse' : ''} ${
                results?.is_dag === true ? 'border-green-500  text-green-800 font-medium' : 
                results?.is_dag === false ? 'border-red-500 text-red-800 font-medium' : ''
              }`}
            />
          </div>
          
          {/* Error message if exists */}
          {results?.error && (
            <div className="grid gap-3">
              <Label htmlFor="error" className="text-red-600">Error</Label>
              <Input 
                id="error" 
                name="error"
                value={results.error}
                readOnly
                className="border-red-500 bg-red-50 text-red-700"
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}