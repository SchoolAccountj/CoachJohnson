import { questions, subjects, asmrTracks, type Question, type Subject, type AsmrTrack, type InsertQuestion, type InsertSubject, type InsertAsmrTrack } from "@shared/schema";

export interface IStorage {
  getSubjects(): Promise<Subject[]>;
  getSubject(slug: string): Promise<Subject | undefined>;
  getQuestionsBySubject(subjectId: number): Promise<Question[]>;
  addQuestion(question: InsertQuestion): Promise<Question>;
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
      { 
        subjectId: 1, 
        question: "What is the Pythagorean theorem?", 
        answer: "a² + b² = c²", 
        difficulty: "medium",
        isUserSubmitted: 0
      },
      { 
        subjectId: 2, 
        question: "What is photosynthesis?", 
        answer: "The process by which plants convert light energy into chemical energy", 
        difficulty: "medium",
        isUserSubmitted: 0
      }
    ];

    questions.forEach(question => {
      const id = this.currentId++;
      const timestamp = new Date();
      this.questions.set(id, { ...question, id, createdAt: timestamp });
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
    return Array.from(this.questions.values())
      .filter(q => q.subjectId === subjectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async addQuestion(question: InsertQuestion): Promise<Question> {
    const id = this.currentId++;
    const timestamp = new Date();
    const newQuestion: Question = { ...question, id, createdAt: timestamp, isUserSubmitted: 1 };
    this.questions.set(id, newQuestion);
    return newQuestion;
  }

  async getAsmrTracks(): Promise<AsmrTrack[]> {
    return Array.from(this.asmrTracks.values());
  }
}

export const storage = new MemStorage();