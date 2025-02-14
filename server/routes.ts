import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuestionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

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

  app.post("/api/subjects/:id/questions", async (req, res) => {
    try {
      const subjectId = parseInt(req.params.id);
      const question = insertQuestionSchema.parse({
        ...req.body,
        subjectId,
        isUserSubmitted: 1,
        difficulty: "user"
      });

      const newQuestion = await storage.addQuestion(question);
      res.status(201).json(newQuestion);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/asmr-tracks", async (_req, res) => {
    const tracks = await storage.getAsmrTracks();
    res.json(tracks);
  });

  const httpServer = createServer(app);
  return httpServer;
}