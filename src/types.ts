/**
 * TypeScript Data Structure Definitions
 * WAB Campus Resource & Lost and Found Directory
 */

export type ResourceCategory = 'counseling' | 'library' | 'tech' | 'service' | 'community';

export interface ResourceItem {
  id: string;
  category: ResourceCategory;
  title: string;
  subtitle?: string;
  lead: string;
  location: string;
  hours: string;
  description: string;
  keyServices: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
    wechat?: string;
    room?: string;
  };
  p5Quote?: string; // High stylized quote/tip in Persona 5 custom dialog style
  actionLabel: string;
}

export type LostFoundType = 'lost' | 'found';

export interface LostFoundItem {
  id: string;
  type: LostFoundType;
  title: string;
  description: string;
  category: string; // 'Clothing/Blazer' | 'Electronics' | 'ID/Card' | 'Bottle/Flask' | 'Keys/Fobs' | 'Bags/Books' | 'Other'
  image: string; // Base64 Data URL or public photo URL
  date: string; // YYYY-MM-DD
  location: string; // 'Atrium' | 'Library' | 'Sports Pitch' | 'Cafeteria' | 'HS Wing' | 'Drama Theater' | 'Gym' | 'Other'
  studentName: string;
  contactDetails: string; // Email or WeChat
  status: 'active' | 'reclaimed';
  rewardInfo?: string; // Optional reward or gratitude note
}

export interface CompactAlert {
  id: string;
  type: 'urgent' | 'announcement' | 'calling-card';
  text: string;
  author: string;
  date: string;
}
