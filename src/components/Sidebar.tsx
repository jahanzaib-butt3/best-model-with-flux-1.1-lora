import React from 'react';
import { Bot, Video, X } from 'lucide-react';

interface SidebarProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const tools = [
  { id: 'llm', name: 'AI Chat', icon: Bot },
  { id: 'video', name: 'Text to Video', icon: Video },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, setSelectedTool, isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        bg-gray-800 border-r border-gray-700 text-gray-100 w-64 space-y-6 py-7 px-2 
        fixed md:static inset-y-0 left-0 transform z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition duration-200 ease-in-out
      `}>
        <div className="flex items-center justify-between px-4 md:hidden">
          <h2 className="text-xl font-semibold text-indigo-400">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`w-full px-4 py-3 rounded-lg transition duration-200 flex items-center ${
                selectedTool === tool.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => {
                setSelectedTool(tool.id);
                onClose();
              }}
            >
              <tool.icon className="mr-3 h-5 w-5" />
              {tool.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;