import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Wrench, Cpu, Zap, Terminal,
  ChevronDown, ChevronUp, Activity, Server
} from 'lucide-react';
import { ChatMessage, ToolCall, MCPTool } from '../types';
import { mcpTools } from '../store/data';

interface AIAgentProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const mockResponses: Record<string, { content: string; toolCalls?: ToolCall[] }> = {
  'список участников': {
    content: 'Загружаю список активных участников техноклуба...',
    toolCalls: [{
      tool: 'list_members',
      parameters: { status: 'active', limit: 50 },
      result: 'Найдено 6 активных участников: Алексей Петров (admin), Мария Иванова (mentor), Дмитрий Козлов (member), Елена Смирнова (member), Анна Белова (mentor), Ольга Морозова (guest)',
      status: 'success',
    }],
  },
  'статистика': {
    content: 'Формирую аналитический отчёт по техноклубу...',
    toolCalls: [{
      tool: 'get_analytics',
      parameters: { period: 'month', metrics: ['members', 'events', 'projects'] },
      result: 'За последний месяц: +2 новых участника, 5 мероприятий проведено, 3 проекта в активной фазе, 12 задач выполнено.',
      status: 'success',
    }],
  },
  'мероприятия': {
    content: 'Показываю предстоящие мероприятия...',
    toolCalls: [{
      tool: 'list_events',
      parameters: { status: 'upcoming' },
      result: 'Предстоящие: 1) ML Воркшоп (15 фев) 2) IoT Хакатон (22 фев) 3) Лекция по микросервисам (1 мар) 4) Demo Day (15 мар)',
      status: 'success',
    }],
  },
  'задачи': {
    content: 'Загружаю текущие задачи...',
    toolCalls: [{
      tool: 'list_tasks',
      parameters: { status: 'active' },
      result: 'Активные задачи: 1) Настроить NLP модель (высокий приоритет) 2) Backend API endpoints (высокий) 3) Подключить сенсоры (средний) 4) Интеграция API (средний)',
      status: 'success',
    }],
  },
  'уведомление': {
    content: 'Отправляю уведомление всем участникам...',
    toolCalls: [{
      tool: 'send_notification',
      parameters: { recipients: 'all', message: 'Напоминание: Demo Day через 2 недели!', channel: 'email' },
      result: 'Уведомление отправлено 6 активным участникам через email и Telegram.',
      status: 'success',
    }],
  },
};

export const AIAgent: React.FC<AIAgentProps> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);
  const [expandedTools, setExpandedTools] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setLocalMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = mockResponses['список участников'];
      
      if (lowerInput.includes('участник') || lowerInput.includes('member')) {
        response = mockResponses['список участников'];
      } else if (lowerInput.includes('статистик') || lowerInput.includes('аналитик') || lowerInput.includes('отчёт')) {
        response = mockResponses['статистика'];
      } else if (lowerInput.includes('мероприят') || lowerInput.includes('событ') || lowerInput.includes('event')) {
        response = mockResponses['мероприятия'];
      } else if (lowerInput.includes('задач') || lowerInput.includes('task')) {
        response = mockResponses['задачи'];
      } else if (lowerInput.includes('уведом') || lowerInput.includes('notif')) {
        response = mockResponses['уведомление'];
      } else {
        response = {
          content: `Понял ваш запрос: "${input}". Обрабатываю через MCP протокол...`,
          toolCalls: [{
            tool: 'process_query',
            parameters: { query: input },
            result: 'Запрос обработан. Результат готов.',
            status: 'success',
          }],
        };
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        toolCalls: response.toolCalls,
      };

      setLocalMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: '📊 Статистика', query: 'Покажи статистику клуба' },
    { label: '👥 Участники', query: 'Список активных участников' },
    { label: '📅 Мероприятия', query: 'Какие предстоящие мероприятия?' },
    { label: '✅ Задачи', query: 'Покажи текущие задачи' },
    { label: '🔔 Уведомление', query: 'Отправь уведомление всем' },
  ];

  return (
    <div className="flex h-screen">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">ИИ-Агент техноклуба</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Онлайн • MCP подключён • 10 инструментов</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                MCP v1.0
              </span>
              <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1">
                <Server className="w-3 h-3" />
                REST API
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {localMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                    : msg.role === 'system'
                    ? 'bg-gray-100 text-gray-600 border border-gray-200'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}>
                  {msg.role === 'system' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-3 h-3 text-cyan-500" />
                      <span className="text-xs font-medium text-cyan-600">Система</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>

                {/* Tool Calls */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.toolCalls.map((tc, idx) => (
                      <div key={idx} className="bg-gray-900 rounded-lg p-3 text-xs font-mono">
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench className="w-3 h-3 text-cyan-400" />
                          <span className="text-cyan-400">{tc.tool}</span>
                          <span className={`ml-auto px-1.5 py-0.5 rounded text-[10px] ${
                            tc.status === 'success' ? 'bg-green-500/20 text-green-400' : 
                            tc.status === 'error' ? 'bg-red-500/20 text-red-400' : 
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {tc.status === 'success' ? '✓ OK' : tc.status === 'error' ? '✗ ERR' : '⏳ ...'}
                          </span>
                        </div>
                        <div className="text-gray-500 mb-1">
                          params: {JSON.stringify(tc.parameters)}
                        </div>
                        {tc.result && (
                          <div className="text-green-400 border-t border-gray-700 pt-2 mt-2">
                            → {tc.result}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <p className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-right' : ''} text-gray-400`}>
                  {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">Агент обрабатывает запрос через MCP...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-2 border-t border-gray-100">
          <div className="flex gap-2 flex-wrap">
            {quickActions.map(action => (
              <button
                key={action.label}
                onClick={() => { setInput(action.query); }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Введите команду для ИИ-агента..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-11 h-11 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            MCP Protocol • Обработка через ИИ-агента • Все запросы логируются
          </p>
        </div>
      </div>

      {/* MCP Tools Panel */}
      <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button 
            onClick={() => setExpandedTools(!expandedTools)}
            className="flex items-center justify-between w-full"
          >
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-500" />
              MCP Инструменты
            </h3>
            {expandedTools ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {expandedTools && (
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {mcpTools.map(tool => (
              <div key={tool.name} className="bg-white rounded-lg border border-gray-200 p-3 hover:border-cyan-200 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-gray-900">{tool.name}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tool.category}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{tool.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {tool.parameters.map(param => (
                    <span key={param} className="text-[10px] bg-cyan-50 text-cyan-700 px-1.5 py-0.5 rounded font-mono">
                      {param}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Вызовов: {tool.callCount}</span>
                  {tool.lastUsed && (
                    <span>{new Date(tool.lastUsed).toLocaleDateString('ru-RU')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MCP Status */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-900 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400 font-medium">MCP Server Status</span>
            </div>
            <div className="space-y-1 text-[10px] font-mono text-gray-400">
              <p>Server: ws://localhost:3001/mcp</p>
              <p>Protocol: MCP v1.0</p>
              <p>Tools registered: {mcpTools.length}</p>
              <p>Uptime: 99.9%</p>
              <p className="text-green-400">Status: CONNECTED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
