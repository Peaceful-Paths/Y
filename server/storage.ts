import { 
  type MusicCollection, 
  type InsertMusicCollection,
  type MeditationPractice,
  type InsertMeditationPractice,
  type PeacefulAction,
  type InsertPeacefulAction
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Music Collections
  getMusicCollections(category?: string): Promise<MusicCollection[]>;
  getFeaturedMusicCollections(): Promise<MusicCollection[]>;
  getMusicCollection(id: string): Promise<MusicCollection | undefined>;
  createMusicCollection(collection: InsertMusicCollection): Promise<MusicCollection>;
  
  // Meditation Practices
  getMeditationPractices(type?: string): Promise<MeditationPractice[]>;
  getFeaturedMeditationPractices(): Promise<MeditationPractice[]>;
  getMeditationPractice(id: string): Promise<MeditationPractice | undefined>;
  createMeditationPractice(practice: InsertMeditationPractice): Promise<MeditationPractice>;
  
  // Peaceful Actions
  getPeacefulActions(category?: string): Promise<PeacefulAction[]>;
  getFeaturedPeacefulActions(): Promise<PeacefulAction[]>;
  getPeacefulAction(id: string): Promise<PeacefulAction | undefined>;
  createPeacefulAction(action: InsertPeacefulAction): Promise<PeacefulAction>;
  
  // Search
  searchContent(query: string): Promise<{
    music: MusicCollection[];
    meditation: MeditationPractice[];
    actions: PeacefulAction[];
  }>;
}

export class MemStorage implements IStorage {
  private musicCollections: Map<string, MusicCollection>;
  private meditationPractices: Map<string, MeditationPractice>;
  private peacefulActions: Map<string, PeacefulAction>;

  constructor() {
    this.musicCollections = new Map();
    this.meditationPractices = new Map();
    this.peacefulActions = new Map();
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Sample music collections
    const musicData = [
      {
        title: "Gentle Wave Meditation",
        description: "Soothing ocean sounds for deep relaxation and peaceful sleep.",
        category: "nature",
        duration: "45 min",
        artist: "Nature Sounds",
        soundcloudUrl: "https://soundcloud.com/example/ocean-waves",
        imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
        featured: 1
      },
      {
        title: "Woodland Morning",
        description: "Birds chirping and gentle rustling leaves for natural tranquility.",
        category: "nature",
        duration: "60 min",
        artist: "Forest Collective",
        soundcloudUrl: "https://soundcloud.com/example/forest-sounds",
        imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
        featured: 0
      },
      {
        title: "Soft Rain Meditation",
        description: "Gentle rainfall sounds perfect for focus and relaxation.",
        category: "ambient",
        duration: "30 min",
        artist: "Rain Studio",
        soundcloudUrl: "https://soundcloud.com/example/rain-sounds",
        imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0",
        featured: 0
      },
      {
        title: "Tibetan Bowl Journey",
        description: "Healing frequencies from traditional singing bowls.",
        category: "instrumental",
        duration: "40 min",
        artist: "Sacred Music",
        soundcloudUrl: "https://soundcloud.com/example/singing-bowls",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        featured: 0
      }
    ];

    for (const data of musicData) {
      await this.createMusicCollection(data);
    }

    // Sample meditation practices
    const meditationData = [
      {
        title: "Mindful Body Scan",
        description: "A gentle practice to reconnect with your body and release tension, perfect for midday restoration.",
        type: "body-scan",
        duration: "15 minutes",
        difficulty: "beginner",
        resourceUrl: "https://example.com/body-scan-meditation",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        featured: 1
      },
      {
        title: "Breathing Space",
        description: "Simple yet powerful breathing techniques to center your mind.",
        type: "breathing",
        duration: "10 minutes",
        difficulty: "beginner",
        resourceUrl: "https://example.com/breathing-meditation",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
        featured: 0
      },
      {
        title: "Loving Kindness Practice",
        description: "Cultivate compassion for yourself and others through heart-centered meditation.",
        type: "loving-kindness",
        duration: "20 minutes",
        difficulty: "intermediate",
        resourceUrl: "https://example.com/loving-kindness-meditation",
        imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e",
        featured: 0
      }
    ];

    for (const data of meditationData) {
      await this.createMeditationPractice(data);
    }

    // Sample peaceful actions
    const actionData = [
      {
        title: "UNICEF Children's Environmental Initiative",
        description: "Support UNICEF's mission to protect children and create sustainable communities for future generations.",
        category: "environmental",
        location: "Global",
        frequency: "ongoing",
        participantCount: 1200000,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
        actionUrl: "https://www.unicef.org/environment-and-climate-change",
        featured: 1
      },
      {
        title: "UNICEF Mental Health Support",
        description: "Help UNICEF provide mental health and psychosocial support to children and families in crisis.",
        category: "wellness",
        location: "Global",
        frequency: "ongoing",
        participantCount: 890000,
        imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e",
        actionUrl: "https://www.unicef.org/mental-health",
        featured: 0
      },
      {
        title: "UNICEF Education for Peace",
        description: "Support UNICEF's education programs that promote peace, tolerance, and understanding among children worldwide.",
        category: "education",
        location: "Global",
        frequency: "ongoing",
        participantCount: 2100000,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        actionUrl: "https://www.unicef.org/education",
        featured: 0
      }
    ];

    for (const data of actionData) {
      await this.createPeacefulAction(data);
    }
  }

  // Music Collections
  async getMusicCollections(category?: string): Promise<MusicCollection[]> {
    const collections = Array.from(this.musicCollections.values());
    if (category) {
      return collections.filter(c => c.category === category);
    }
    return collections;
  }

  async getFeaturedMusicCollections(): Promise<MusicCollection[]> {
    return Array.from(this.musicCollections.values()).filter(c => c.featured === 1);
  }

  async getMusicCollection(id: string): Promise<MusicCollection | undefined> {
    return this.musicCollections.get(id);
  }

  async createMusicCollection(collection: InsertMusicCollection): Promise<MusicCollection> {
    const id = randomUUID();
    const newCollection: MusicCollection = { ...collection, id };
    this.musicCollections.set(id, newCollection);
    return newCollection;
  }

  // Meditation Practices
  async getMeditationPractices(type?: string): Promise<MeditationPractice[]> {
    const practices = Array.from(this.meditationPractices.values());
    if (type) {
      return practices.filter(p => p.type === type);
    }
    return practices;
  }

  async getFeaturedMeditationPractices(): Promise<MeditationPractice[]> {
    return Array.from(this.meditationPractices.values()).filter(p => p.featured === 1);
  }

  async getMeditationPractice(id: string): Promise<MeditationPractice | undefined> {
    return this.meditationPractices.get(id);
  }

  async createMeditationPractice(practice: InsertMeditationPractice): Promise<MeditationPractice> {
    const id = randomUUID();
    const newPractice: MeditationPractice = { ...practice, id };
    this.meditationPractices.set(id, newPractice);
    return newPractice;
  }

  // Peaceful Actions
  async getPeacefulActions(category?: string): Promise<PeacefulAction[]> {
    const actions = Array.from(this.peacefulActions.values());
    if (category) {
      return actions.filter(a => a.category === category);
    }
    return actions;
  }

  async getFeaturedPeacefulActions(): Promise<PeacefulAction[]> {
    return Array.from(this.peacefulActions.values()).filter(a => a.featured === 1);
  }

  async getPeacefulAction(id: string): Promise<PeacefulAction | undefined> {
    return this.peacefulActions.get(id);
  }

  async createPeacefulAction(action: InsertPeacefulAction): Promise<PeacefulAction> {
    const id = randomUUID();
    const newAction: PeacefulAction = { ...action, id };
    this.peacefulActions.set(id, newAction);
    return newAction;
  }

  // Search
  async searchContent(query: string): Promise<{
    music: MusicCollection[];
    meditation: MeditationPractice[];
    actions: PeacefulAction[];
  }> {
    const lowerQuery = query.toLowerCase();
    
    const music = Array.from(this.musicCollections.values()).filter(
      c => c.title.toLowerCase().includes(lowerQuery) || 
           c.description.toLowerCase().includes(lowerQuery) ||
           c.category.toLowerCase().includes(lowerQuery)
    );
    
    const meditation = Array.from(this.meditationPractices.values()).filter(
      p => p.title.toLowerCase().includes(lowerQuery) || 
           p.description.toLowerCase().includes(lowerQuery) ||
           p.type.toLowerCase().includes(lowerQuery)
    );
    
    const actions = Array.from(this.peacefulActions.values()).filter(
      a => a.title.toLowerCase().includes(lowerQuery) || 
           a.description.toLowerCase().includes(lowerQuery) ||
           a.category.toLowerCase().includes(lowerQuery)
    );

    return { music, meditation, actions };
  }
}

export const storage = new MemStorage();
