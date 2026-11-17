import React from 'react';
import { 
  LayoutDashboard, Users, Calendar, FolderKanban, 
  Bot, ScrollText, Settings, Cpu, Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
  { id: 'members', label: 'Участники', icon: Users },
  { id: 'events', label: 'Мероприятия', icon: Calendar },
  { id: 'projects', label: 'Проекты', icon: FolderKanban },
  { id: 'agent', label: 'ИИ Агент', icon: Bot },
  { id: 'logs', label: 'API / MCP Логи', icon: ScrollText },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-800">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">ТехноКлуб</h1>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              AI-Powered CRM
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
              {item.label}
              {item.id === 'agent' && (
                <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Agent Status */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Агент онлайн</span>
          </div>
          <p className="text-xs text-gray-500">MCP сервер подключён</p>
          <p className="text-xs text-gray-500">10 инструментов доступно</p>
        </div>
      </div>
    </aside>
  );
};
