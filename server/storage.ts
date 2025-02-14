import { questions, subjects, asmrTracks, type Question, type Subject, type AsmrTrack, type InsertQuestion, type InsertSubject, type InsertAsmrTrack } from "@shared/schema";

export interface IStorage {
  getSubjects(): Promise<Subject[]>;
  getSubject(slug: string): Promise<Subject | undefined>;
  getQuestionsBySubject(subjectId: number): Promise<Question[]>;
  getAsmrTracks(): Promise<AsmrTrack[]>;
}

export class MemStorage implements IStorage {
  private subjects: Map<number, Subject>;
  private questions: Map<number, Question>;
  private asmrTracks: Map<number, AsmrTrack>;
  private currentId: number;

  constructor() {
    this.subjects = new Map();
    this.questions = new Map();
    this.asmrTracks = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    const subjects: InsertSubject[] = [
      { name: "Mathematics", slug: "math" },
      { name: "Science", slug: "science" },
      { name: "English", slug: "english" },
      { name: "Social Studies", slug: "social-studies" }
    ];

    subjects.forEach(subject => {
      const id = this.currentId++;
      this.subjects.set(id, { ...subject, id });
    });

    const questions: (InsertQuestion & { subjectId: number })[] = [
      { subjectId: 1, question: "What is the Pythagorean theorem?", answer: "a² + b² = c²", difficulty: "medium" },
      { subjectId: 2, question: "What is photosynthesis?", answer: "The process by which plants convert light energy into chemical energy", difficulty: "medium" },
      // Add more sample questions
    ];

    questions.forEach(question => {
      const id = this.currentId++;
      this.questions.set(id, { ...question, id });
    });

    const asmrTracks: InsertAsmrTrack[] = [
      {
        title: "Gentle Rain",
        type: "rain",
        config: {
          intensity: 0.5,
          sound: "rain-soft",
          particleCount: 100
        }
      },
      {
        title: "Study Atmosphere",
        type: "study",
        config: {
          intensity: 0.3,
          sound: "rain-medium",
          particleCount: 150
        }
      }
    ];

    asmrTracks.forEach(track => {
      const id = this.currentId++;
      this.asmrTracks.set(id, { ...track, id });
    });
  }

  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubject(slug: string): Promise<Subject | undefined> {
    return Array.from(this.subjects.values()).find(s => s.slug === slug);
  }

  async getQuestionsBySubject(subjectId: number): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(q => q.subjectId === subjectId);
  }

  async getAsmrTracks(): Promise<AsmrTrack[]> {
    return Array.from(this.asmrTracks.values());
  }
}

export const storage = new MemStorage();
