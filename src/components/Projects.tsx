import React, { useState } from 'react';
import { FolderKanban, Users, Calendar, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Project, Member } from '../types';

interface ProjectsProps {
  projects: Project[];
  members: Member[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects, members }) => {
  const [filter, setFilter] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'board'>('grid');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  const statusLabels: Record<string, string> = {
    planning: 'Планирование',
    active: 'Активный',
    review: 'На проверке',
    completed: 'Завершён',
  };

  const statusColors: Record<string, string> = {
    planning: 'bg-gray-100 text-gray-700',
    active: 'bg-blue-100 text-blue-700',
    review: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
  };

  const priorityColors: Record<string, string> = {
    low: 'text-gray-500',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600',
  };

  const getMemberName = (id: string) => members.find(m => m.id === id)?.name || 'Неизвестно';

  if (view === 'board') {
    const columns = ['planning', 'active', 'review', 'completed'];
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Проекты</h1>
            <p className="text-gray-500 text-sm mt-1">Kanban-доска проектов</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('grid')} className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">Сетка</button>
            <button onClick={() => setView('board')} className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg">Доска</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {columns.map(col => (
            <div key={col} className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  col === 'planning' ? 'bg-gray-400' :
                  col === 'active' ? 'bg-blue-500' :
                  col === 'review' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <h3 className="text-sm font-semibold text-gray-700">{statusLabels[col]}</h3>
                <span className="text-xs text-gray-400 ml-auto">
                  {projects.filter(p => p.status === col).length}
                </span>
              </div>
              {projects.filter(p => p.status === col).map(project => (
                <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${priorityColors[project.priority]}`}>
                      {project.priority === 'critical' ? '🔴' : project.priority === 'high' ? '🟠' : project.priority === 'medium' ? '🟡' : '🟢'}
                    </span>
                    <span className="text-xs text-gray-400">{project.progress}%</span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{project.name}</h4>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{project.description}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                      {project.members.slice(0, 3).map((mId, i) => (
                        <div key={i} className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full border border-white text-white text-[8px] flex items-center justify-center font-bold">
                          {members.find(m => m.id === mId)?.avatar?.[0] || '?'}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Проекты</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} проектов • {projects.filter(p => p.status === 'active').length} активных</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView('grid')} className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg">Сетка</button>
          <button onClick={() => setView('board')} className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">Доска</button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'planning', 'active', 'review', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'Все' : statusLabels[status]}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(project => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>
                <span className={`text-xs font-medium ${priorityColors[project.priority]}`}>
                  {project.priority === 'critical' && '⚠️ Критический'}
                  {project.priority === 'high' && 'Высокий'}
                  {project.priority === 'medium' && 'Средний'}
                  {project.priority === 'low' && 'Низкий'}
                </span>
              </div>
              <FolderKanban className="w-5 h-5 text-gray-300" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{project.description}</p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-500">Прогресс</span>
                <span className="text-xs font-bold text-gray-700">{project.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    project.progress >= 80 ? 'bg-green-500' :
                    project.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Team */}
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">Лид: {getMemberName(project.lead)}</span>
              <span className="text-xs text-gray-400">• {project.members.length} участников</span>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.startDate}
              </span>
              <ArrowRight className="w-3 h-3" />
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.deadline}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
