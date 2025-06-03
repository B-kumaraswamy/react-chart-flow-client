// draggableNode.js
export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '90px',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        backgroundColor: 'rgb(31, 41, 55)',
        border: '1px solid rgb(75, 85, 99)',
        color: 'rgb(243, 244, 246)',
        fontSize: '12px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      }}
      draggable
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'rgb(55, 65, 81)';
        e.target.style.borderColor = 'rgb(96, 165, 250)';
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'rgb(31, 41, 55)';
        e.target.style.borderColor = 'rgb(75, 85, 99)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
      }}
    >
      <span>{label}</span>
    </div>
  );
};