import React from 'react';
import { 
  Users, Calendar, FolderKanban, CheckCircle, 
  TrendingUp, Clock, AlertCircle, Bot
} from 'lucide-react';
import { Member, Event, Project, Task } from '../types';

interface DashboardProps {
  members: Member[];
  events: Event[];
  projects: Project[];
  tasks: Task[];
}

export const Dashboard: React.FC<DashboardProps> = ({ members, events, projects, tasks }) => {
  const activeMembers = members.filter(m => m.status === 'active').length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const pendingTasks = tasks.filter(t => t.status === 'todo' || t.status === 'in_progress').length;

  const stats = [
    { label: 'Активных участников', value: activeMembers, total: members.length, icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10' },
    { label: 'Предстоящие события', value: upcomingEvents, total: events.length, icon: Calendar, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/10' },
    { label: 'Активных проектов', value: activeProjects, total: projects.length, icon: FolderKanban, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/10' },
    { label: 'Задач завершено', value: completedTasks, total: tasks.length, icon: CheckCircle, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
  ];

  const recentEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const urgentTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done').slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-500 text-sm mt-1">Обзор деятельности техноклуба</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <Bot className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700 font-medium">ИИ-агент активен</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{stat.value}/{stat.total}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Ближайшие мероприятия
            </h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{upcomingEvents} предстоящих</span>
          </div>
          <div className="space-y-3">
            {recentEvents.map(event => (
              <div key={event.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                  event.type === 'workshop' ? 'bg-blue-500' :
                  event.type === 'hackathon' ? 'bg-red-500' :
                  event.type === 'meetup' ? 'bg-green-500' :
                  event.type === 'lecture' ? 'bg-purple-500' : 'bg-orange-500'
                }`}>
                  {event.date.split('-')[2]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time} • {event.location}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {event.participants.length}/{event.maxParticipants}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Срочные задачи
            </h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{urgentTasks.length} активных</span>
          </div>
          <div className="space-y-3">
            {urgentTasks.map(task => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-xs text-gray-500">
                    {task.status === 'todo' ? 'К выполнению' : 'В процессе'} • до {task.dueDate}
                  </p>
                </div>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <FolderKanban className="w-5 h-5 text-orange-500" />
          Прогресс проектов
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project.id} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  project.status === 'active' ? 'bg-blue-100 text-blue-700' :
                  project.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                  project.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status === 'active' ? 'Активный' :
                   project.status === 'review' ? 'На проверке' :
                   project.status === 'completed' ? 'Завершён' : 'Планирование'}
                </span>
                <span className="text-xs text-gray-400">{project.priority}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">{project.name}</h4>
              <p className="text-xs text-gray-500 mb-3 truncate">{project.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      project.progress >= 80 ? 'bg-green-500' :
                      project.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{project.progress}%</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold">Сводка от ИИ-агента</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-xs text-gray-400 mb-1">Задачи на сегодня</p>
            <p className="text-lg font-bold">{pendingTasks} активных задач</p>
            <p className="text-xs text-cyan-400 mt-1">2 требуют внимания</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-xs text-gray-400 mb-1">Загрузка участников</p>
            <p className="text-lg font-bold">{activeMembers} из {members.length} активны</p>
            <p className="text-xs text-green-400 mt-1">+1 новый за неделю</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-xs text-gray-400 mb-1">MCP вызовы сегодня</p>
            <p className="text-lg font-bold">47 операций</p>
            <p className="text-xs text-yellow-400 mt-1">Все успешны</p>
          </div>
        </div>
      </div>
    </div>
  );
};
