import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Tag } from 'lucide-react';
import { Event } from '../types';

interface EventsProps {
  events: Event[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? events : events.filter(e => e.status === filter);

  const typeIcons: Record<string, string> = {
    workshop: '🔧',
    hackathon: '⚡',
    meetup: '💬',
    lecture: '📚',
    demo: '🎯',
  };

  const typeLabels: Record<string, string> = {
    workshop: 'Воркшоп',
    hackathon: 'Хакатон',
    meetup: 'Митап',
    lecture: 'Лекция',
    demo: 'Демо',
  };

  const statusColors: Record<string, string> = {
    upcoming: 'bg-blue-100 text-blue-700',
    ongoing: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-700',
  };

  const statusLabels: Record<string, string> = {
    upcoming: 'Предстоит',
    ongoing: 'Идёт',
    completed: 'Завершено',
    cancelled: 'Отменено',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мероприятия</h1>
          <p className="text-gray-500 text-sm mt-1">{events.length} мероприятий • {events.filter(e => e.status === 'upcoming').length} предстоящих</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
          <Plus className="w-4 h-4" />
          Создать мероприятие
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'upcoming', 'ongoing', 'completed', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'Все' : statusLabels[status]}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(event => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all hover:border-gray-300">
            <div className="flex items-start justify-between mb-3">
              <div className="text-2xl">{typeIcons[event.type]}</div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[event.status]}`}>
                {statusLabels[event.status]}
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{event.participants.length}/{event.maxParticipants}</span>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {typeLabels[event.type]}
              </span>
            </div>

            {/* Participant avatars */}
            <div className="flex items-center mt-3">
              <div className="flex -space-x-2">
                {event.participants.slice(0, 4).map((_, i) => (
                  <div key={i} className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              {event.participants.length > 4 && (
                <span className="text-xs text-gray-400 ml-2">+{event.participants.length - 4}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
