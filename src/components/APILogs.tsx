import React, { useState } from 'react';
import { ScrollText, Filter, Download, RefreshCw, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { APILog } from '../types';

interface APILogsProps {
  logs: APILog[];
}

export const APILogs: React.FC<APILogsProps> = ({ logs }) => {
  const [filter, setFilter] = useState<string>('all');
  const [protocolFilter, setProtocolFilter] = useState<string>('all');

  const filtered = logs.filter(log => {
    const matchProtocol = protocolFilter === 'all' || log.protocol === protocolFilter;
    const matchMethod = filter === 'all' || log.method === filter;
    return matchProtocol && matchMethod;
  });

  const methodColors: Record<string, string> = {
    GET: 'bg-green-100 text-green-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700',
  };

  const protocolColors: Record<string, string> = {
    REST: 'bg-purple-100 text-purple-700',
    MCP: 'bg-cyan-100 text-cyan-700',
  };

  const totalCalls = logs.length;
  const mcpCalls = logs.filter(l => l.protocol === 'MCP').length;
  const restCalls = logs.filter(l => l.protocol === 'REST').length;
  const avgDuration = Math.round(logs.reduce((acc, l) => acc + l.duration, 0) / logs.length);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API / MCP Логи</h1>
          <p className="text-gray-500 text-sm mt-1">Журнал всех вызовов API и MCP инструментов</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            Обновить
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Экспорт
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Всего вызовов</p>
          <p className="text-2xl font-bold text-gray-900">{totalCalls}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">MCP вызовы</p>
          <p className="text-2xl font-bold text-cyan-600">{mcpCalls}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">REST вызовы</p>
          <p className="text-2xl font-bold text-purple-600">{restCalls}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Среднее время</p>
          <p className="text-2xl font-bold text-gray-900">{avgDuration}ms</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">Протокол:</span>
          {['all', 'MCP', 'REST'].map(p => (
            <button
              key={p}
              onClick={() => setProtocolFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                protocolFilter === p ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p === 'all' ? 'Все' : p}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Метод:</span>
          {['all', 'GET', 'POST', 'PUT', 'DELETE'].map(m => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === m ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {m === 'all' ? 'Все' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Время</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Метод</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Протокол</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Endpoint</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Время</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Данные</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 text-xs text-gray-500 font-mono">
                  {new Date(log.timestamp).toLocaleTimeString('ru-RU')}
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${methodColors[log.method]}`}>
                    {log.method}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${protocolColors[log.protocol]}`}>
                    {log.protocol}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs font-mono text-gray-700">{log.endpoint}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold ${log.status < 300 ? 'text-green-600' : 'text-red-600'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-gray-500">{log.duration}ms</td>
                <td className="px-5 py-3">
                  {log.payload ? (
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded max-w-[200px] truncate inline-block">
                      {log.payload}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MCP Protocol Info */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-5">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
          <ScrollText className="w-5 h-5 text-cyan-600" />
          О протоколе MCP
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium">JSON-RPC 2.0</span>
            </div>
            <p className="text-xs text-gray-600">MCP использует JSON-RPC 2.0 для коммуникации между клиентом и сервером инструментов.</p>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Tool Discovery</span>
            </div>
            <p className="text-xs text-gray-600">ИИ-агент автоматически обнаруживает доступные инструменты и их параметры при подключении.</p>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Streaming</span>
            </div>
            <p className="text-xs text-gray-600">Поддержка потоковой передачи результатов для длинных операций через SSE.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
