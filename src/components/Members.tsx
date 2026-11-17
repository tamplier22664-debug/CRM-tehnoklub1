import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Mail, Shield, UserCheck } from 'lucide-react';
import { Member } from '../types';

interface MembersProps {
  members: Member[];
  onUpdate: (members: Member[]) => void;
}

export const Members: React.FC<MembersProps> = ({ members, onUpdate }) => {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                       m.email.toLowerCase().includes(search.toLowerCase()) ||
                       m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchRole = filterRole === 'all' || m.role === filterRole;
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const roleColors: Record<string, string> = {
    admin: 'bg-red-100 text-red-700',
    mentor: 'bg-purple-100 text-purple-700',
    member: 'bg-blue-100 text-blue-700',
    guest: 'bg-gray-100 text-gray-700',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-600',
    pending: 'bg-yellow-100 text-yellow-700',
  };

  const roleLabels: Record<string, string> = {
    admin: 'Админ',
    mentor: 'Ментор',
    member: 'Участник',
    guest: 'Гость',
  };

  const statusLabels: Record<string, string> = {
    active: 'Активен',
    inactive: 'Неактивен',
    pending: 'Ожидание',
  };

  const handleApprove = (id: string) => {
    onUpdate(members.map(m => m.id === id ? { ...m, status: 'active' as const } : m));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Участники</h1>
          <p className="text-gray-500 text-sm mt-1">{members.length} всего • {members.filter(m => m.status === 'active').length} активных</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
        >
          <Plus className="w-4 h-4" />
          Добавить участника
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по имени, email, навыкам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        >
          <option value="all">Все роли</option>
          <option value="admin">Админ</option>
          <option value="mentor">Ментор</option>
          <option value="member">Участник</option>
          <option value="guest">Гость</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        >
          <option value="all">Все статусы</option>
          <option value="active">Активен</option>
          <option value="inactive">Неактивен</option>
          <option value="pending">Ожидание</option>
        </select>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Участник</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Роль</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Навыки</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Дата вступления</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(member => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[member.role]}`}>
                    {member.role === 'admin' && <Shield className="w-3 h-3" />}
                    {roleLabels[member.role]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[member.status]}`}>
                    {statusLabels[member.status]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{member.joinDate}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {member.status === 'pending' && (
                      <button 
                        onClick={() => handleApprove(member.id)}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors flex items-center gap-1"
                      >
                        <UserCheck className="w-3 h-3" />
                        Одобрить
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Добавить участника</h3>
            <div className="space-y-3">
              <input placeholder="Имя" className="w-full px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Email" type="email" className="w-full px-3 py-2 border rounded-lg text-sm" />
              <select className="w-full px-3 py-2 border rounded-lg text-sm">
                <option>Участник</option>
                <option>Ментор</option>
                <option>Гость</option>
              </select>
              <input placeholder="Навыки (через запятую)" className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                Отмена
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
