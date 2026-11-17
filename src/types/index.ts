export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'member' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  skills: string[];
  joinDate: string;
  avatar: string;
  projects: string[];
}

export interface Event {
  id: string;
  title: string;
  type: 'workshop' | 'hackathon' | 'meetup' | 'lecture' | 'demo';
  date: string;
  time: string;
  location: string;
  participants: string[];
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  lead: string;
  members: string[];
  status: 'planning' | 'active' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  deadline: string;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  projectId: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface MCPTool {
  name: string;
  description: string;
  category: string;
  parameters: string[];
  lastUsed: string | null;
  callCount: number;
}

export interface APILog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  protocol: 'REST' | 'MCP';
  status: number;
  duration: number;
  payload?: string;
  response?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  tool: string;
  parameters: Record<string, any>;
  result?: string;
  status: 'pending' | 'success' | 'error';
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  upcomingEvents: number;
  activeProjects: number;
  tasksCompleted: number;
  tasksPending: number;
}
