import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/subjects", async (_req, res) => {
    const subjects = await storage.getSubjects();
    res.json(subjects);
  });

  app.get("/api/subjects/:slug", async (req, res) => {
    const subject = await storage.getSubject(req.params.slug);
    if (!subject) {
      res.status(404).json({ message: "Subject not found" });
      return;
    }
    res.json(subject);
  });

  app.get("/api/subjects/:id/questions", async (req, res) => {
    const questions = await storage.getQuestionsBySubject(parseInt(req.params.id));
    res.json(questions);
  });

  app.get("/api/asmr-tracks", async (_req, res) => {
    const tracks = await storage.getAsmrTracks();
    res.json(tracks);
  });

  const httpServer = createServer(app);
  return httpServer;
}
