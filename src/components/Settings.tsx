import React, { useState } from 'react';
import { Settings, Server, Key, Webhook, Shield, Database, Bell, Cpu } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('mcp');

  const sections = [
    { id: 'mcp', label: 'MCP Сервер', icon: Server },
    { id: 'api', label: 'API Ключи', icon: Key },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'database', label: 'База данных', icon: Database },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-500 text-sm mt-1">Конфигурация системы и интеграций</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Nav */}
        <div className="w-56 space-y-1">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeSection === 'mcp' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">MCP Сервер</h3>
                  <p className="text-xs text-gray-500">Настройки подключения к MCP серверу</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL сервера</label>
                  <input 
                    defaultValue="ws://localhost:3001/mcp" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Протокол</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20">
                    <option>WebSocket (ws://)</option>
                    <option>HTTP SSE (http://)</option>
                    <option>stdio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Версия MCP</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20">
                    <option>v1.0</option>
                    <option>v0.9 (legacy)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Таймаут подключения (мс)</label>
                  <input 
                    defaultValue="5000" 
                    type="number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-700 font-medium">Сервер подключён</span>
                  </div>
                  <span className="text-xs text-green-600">Ping: 12ms</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                Сохранить настройки
              </button>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">API Ключи</h3>
                  <p className="text-xs text-gray-500">Управление ключами доступа</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">OpenAI API Key</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Активен</span>
                  </div>
                  <div className="font-mono text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded">
                    sk-••••••••••••••••••••••••••••3xFg
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Anthropic API Key</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Активен</span>
                  </div>
                  <div className="font-mono text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded">
                    sk-ant-••••••••••••••••••••••••7kLm
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Supabase Key</span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Ограничен</span>
                  </div>
                  <div className="font-mono text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded">
                    eyJhbGciOiJIUzI1NiIs••••••••••••••
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                + Добавить новый ключ
              </button>
            </div>
          )}

          {activeSection === 'webhooks' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Webhook className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Webhooks</h3>
                  <p className="text-xs text-gray-500">Настройка webhook endpoints</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Новый участник</p>
                    <p className="text-xs text-gray-500 font-mono">POST /webhooks/member-created</p>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Завершение задачи</p>
                    <p className="text-xs text-gray-500 font-mono">POST /webhooks/task-completed</p>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">MCP Tool Call</p>
                    <p className="text-xs text-gray-500 font-mono">POST /webhooks/mcp-event</p>
                  </div>
                  <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'security' || activeSection === 'database' || activeSection === 'notifications') && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Раздел в разработке</p>
                <p className="text-xs text-gray-400 mt-1">Настройки будут доступны в следующем обновлении</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
