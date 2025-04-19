export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: Date;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: any;
  agentName: string;
  agentAvatar: any;
  isVerified: boolean;
  messages: ChatMessage[];
  lastActive: Date;
  unreadCount: number;
}