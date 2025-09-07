import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Music Collections
  app.get("/api/music", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const collections = await storage.getMusicCollections(category);
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch music collections" });
    }
  });

  app.get("/api/music/featured", async (req, res) => {
    try {
      const featured = await storage.getFeaturedMusicCollections();
      res.json(featured);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured music" });
    }
  });

  app.get("/api/music/:id", async (req, res) => {
    try {
      const collection = await storage.getMusicCollection(req.params.id);
      if (!collection) {
        return res.status(404).json({ message: "Music collection not found" });
      }
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch music collection" });
    }
  });

  // Meditation Practices
  app.get("/api/meditation", async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      const practices = await storage.getMeditationPractices(type);
      res.json(practices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meditation practices" });
    }
  });

  app.get("/api/meditation/featured", async (req, res) => {
    try {
      const featured = await storage.getFeaturedMeditationPractices();
      res.json(featured);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured meditation" });
    }
  });

  app.get("/api/meditation/:id", async (req, res) => {
    try {
      const practice = await storage.getMeditationPractice(req.params.id);
      if (!practice) {
        return res.status(404).json({ message: "Meditation practice not found" });
      }
      res.json(practice);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meditation practice" });
    }
  });

  // Peaceful Actions
  app.get("/api/actions", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const actions = await storage.getPeacefulActions(category);
      res.json(actions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch peaceful actions" });
    }
  });

  app.get("/api/actions/featured", async (req, res) => {
    try {
      const featured = await storage.getFeaturedPeacefulActions();
      res.json(featured);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured actions" });
    }
  });

  app.get("/api/actions/:id", async (req, res) => {
    try {
      const action = await storage.getPeacefulAction(req.params.id);
      if (!action) {
        return res.status(404).json({ message: "Peaceful action not found" });
      }
      res.json(action);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch peaceful action" });
    }
  });

  // Search
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const results = await storage.searchContent(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
