import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Members } from './components/Members';
import { Events } from './components/Events';
import { Projects } from './components/Projects';
import { AIAgent } from './components/AIAgent';
import { APILogs } from './components/APILogs';
import { SettingsPage } from './components/Settings';
import { 
  initialMembers, initialEvents, initialProjects, initialTasks, 
  initialAPILogs, initialChatMessages 
} from './store/data';
import { Member, ChatMessage } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  const handleSendMessage = (message: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard members={members} events={initialEvents} projects={initialProjects} tasks={initialTasks} />;
      case 'members':
        return <Members members={members} onUpdate={setMembers} />;
      case 'events':
        return <Events events={initialEvents} />;
      case 'projects':
        return <Projects projects={initialProjects} members={members} />;
      case 'agent':
        return <AIAgent messages={chatMessages} onSendMessage={handleSendMessage} />;
      case 'logs':
        return <APILogs logs={initialAPILogs} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard members={members} events={initialEvents} projects={initialProjects} tasks={initialTasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={`flex-1 ${activeTab === 'agent' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
