import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  difficulty: text("difficulty").notNull(),
});

export const asmrTracks = pgTable("asmr_tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'rain', 'study', etc.
  config: json("config").notNull(), // Animation/sound config
});

export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });
export const insertSubjectSchema = createInsertSchema(subjects).omit({ id: true });
export const insertAsmrTrackSchema = createInsertSchema(asmrTracks).omit({ id: true });

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type InsertAsmrTrack = z.infer<typeof insertAsmrTrackSchema>;

export type Question = typeof questions.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type AsmrTrack = typeof asmrTracks.$inferSelect;
