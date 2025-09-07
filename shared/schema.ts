import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const musicCollections = pgTable("music_collections", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "ambient", "nature", "instrumental", "binaural"
  duration: text("duration").notNull(),
  artist: text("artist").notNull(),
  soundcloudUrl: text("soundcloud_url").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: integer("featured").default(0), // 0 = false, 1 = true
});

export const meditationPractices = pgTable("meditation_practices", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "breathing", "focused", "loving-kindness", "body-scan"
  duration: text("duration").notNull(),
  difficulty: text("difficulty").notNull(), // "beginner", "intermediate", "advanced"
  resourceUrl: text("resource_url").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: integer("featured").default(0),
});

export const peacefulActions = pgTable("peaceful_actions", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "environmental", "community", "wellness", "education"
  location: text("location").notNull(),
  frequency: text("frequency").notNull(), // "one-time", "weekly", "monthly"
  participantCount: integer("participant_count").default(0),
  imageUrl: text("image_url").notNull(),
  actionUrl: text("action_url").notNull(),
  featured: integer("featured").default(0),
});

export const insertMusicCollectionSchema = createInsertSchema(musicCollections).omit({
  id: true,
});

export const insertMeditationPracticeSchema = createInsertSchema(meditationPractices).omit({
  id: true,
});

export const insertPeacefulActionSchema = createInsertSchema(peacefulActions).omit({
  id: true,
});

export type InsertMusicCollection = z.infer<typeof insertMusicCollectionSchema>;
export type MusicCollection = typeof musicCollections.$inferSelect;

export type InsertMeditationPractice = z.infer<typeof insertMeditationPracticeSchema>;
export type MeditationPractice = typeof meditationPractices.$inferSelect;

export type InsertPeacefulAction = z.infer<typeof insertPeacefulActionSchema>;
export type PeacefulAction = typeof peacefulActions.$inferSelect;
